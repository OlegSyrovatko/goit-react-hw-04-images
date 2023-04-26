import React, { Component } from 'react';
import PropTypes from 'prop-types';
import apiContent from '../../services/content-api';
import PicturesDataView from '../PicturesDataView';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Button } from './ImageGallery.styled';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    pictures: [],
    error: null,
    page: 1,
    scrollPosition: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pictureQuery;
    const nextName = this.props.pictureQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({
        status: Status.PENDING,
        scrollPosition:
          window.pageYOffset || document.documentElement.scrollTop,
      });

      apiContent
        .fetchPicture(nextName, nextPage)
        .then(pictures => {
          if (prevName !== nextName) {
            this.setState({
              pictures: pictures,
              status: Status.RESOLVED,
            });
          } else {
            this.setState(
              {
                pictures: prevState.pictures
                  ? [...prevState.pictures, ...pictures]
                  : pictures,
                status: Status.RESOLVED,
              },
              () => {
                window.scrollTo(0, this.state.scrollPosition);
              }
            );
          }
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { pictures, status } = this.state;
    const { onImageClick } = this.props;

    if (status === Status.PENDING) {
      Loading.circle('Loading...');
      return null;
    } else {
      Loading.remove();
    }

    if (status === 'rejected') {
      Report.info(`${this.state.error}`);
    }

    if (status === 'resolved') {
      return (
        <>
          <PicturesDataView pictures={pictures} onImageClick={onImageClick} />
          {pictures && pictures.length >= 12 && (
            <Button onClick={this.handleLoadMore}>Load more</Button>
          )}
        </>
      );
    }
    return null;
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  pictureQuery: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
