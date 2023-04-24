import React, { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import { Container } from './App.styled';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

export class App extends Component {
  state = {
    pictureQuery: '',
    showModal: false,
    selectedImage: null,
  };

  search = pictureQuery => {
    this.setState({ pictureQuery });
  };

  handleImageClick = async (id, largeImageURL, tags) => {
    Loading.circle('Loading...');
    try {
      this.setState({
        showModal: true,
        selectedImage: { id, largeImageURL, tags },
      });
    } catch (error) {
      Report.info(`${error}`);
    } finally {
      Loading.remove();
    }
  };
  handleClose = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  render() {
    const { showModal, selectedImage, pictureQuery } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.search} />
        <ImageGallery
          pictureQuery={pictureQuery}
          onImageClick={this.handleImageClick}
        />
        {showModal && selectedImage && (
          <Modal image={selectedImage} onClose={this.handleClose} />
        )}
      </Container>
    );
  }
}
