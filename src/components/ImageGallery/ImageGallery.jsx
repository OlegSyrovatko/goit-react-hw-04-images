import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import apiContent from '../../services/content-api';
import PicturesDataView from '../PicturesDataView';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Button } from './ImageGallery.styled';

const ImageGallery = ({ pictureQuery, onImageClick }) => {
  const [status, setStatus] = useState('');
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    setPictures([]);
    setPage(1);
  }, [pictureQuery]);

  // useEffect(() => {
  //   if (page > 0 && !pictures) {
  //     console.log(page);
  //     console.log(pictureQuery);
  //     setPage(1);
  //   }
  // });

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    setStatus('pending');
    setScrollPosition(window.pageYOffset || document.documentElement.scrollTop);

    apiContent
      .fetchPicture(pictureQuery, page)
      .then(pictures => {
        setPictures(pervPictures => {
          return pervPictures ? [...pervPictures, ...pictures] : pictures;
        });
        setStatus('resolved');
        // console.log(pictures);
        // console.log(page);
      })
      .catch(error => {
        setStatus('rejected');
        setError(error);
      });
    // eslint-disable-next-line
  }, [pictureQuery, page]);

  useEffect(() => {
    if (status === 'resolved') {
      window.scrollTo(0, scrollPosition);
    }
    // eslint-disable-next-line
  }, [status]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === 'pending') {
    Loading.circle('Loading...');
  } else {
    Loading.remove();
  }

  if (status === 'rejected') {
    Report.info(`${error}`);
  }

  if (status === 'resolved') {
    return (
      <>
        <PicturesDataView pictures={pictures} onImageClick={onImageClick} />
        {pictures && pictures.length >= 12 && (
          <Button onClick={handleLoadMore}>Load more</Button>
        )}
      </>
    );
  }
  return null;
};

export default ImageGallery;

ImageGallery.propTypes = {
  pictureQuery: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
