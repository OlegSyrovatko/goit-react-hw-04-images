import { React, useState } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import { Container } from './App.styled';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

export const App = () => {
  const [pictureQuery, setPictureQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const search = pictureQuery => {
    setPictureQuery(pictureQuery);
  };

  const handleImageClick = async (id, largeImageURL, tags) => {
    Loading.circle('Loading...');
    try {
      setShowModal(false);
      setSelectedImage({ id, largeImageURL, tags });
    } catch (error) {
      Report.info(`${error}`);
    } finally {
      Loading.remove();
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <Container>
      <Searchbar onSubmit={search} />
      <ImageGallery
        pictureQuery={pictureQuery}
        onImageClick={handleImageClick}
      />
      {showModal && selectedImage && (
        <Modal image={selectedImage} onClose={handleClose} />
      )}
    </Container>
  );
};
