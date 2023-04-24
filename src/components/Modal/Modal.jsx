import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContainer, Image } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { image, onClose } = this.props;
    return (
      <Overlay onClick={onClose}>
        <ModalContainer onClick={e => e.stopPropagation()}>
          <Image src={image.largeImageURL} alt={image.tags} />
        </ModalContainer>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
