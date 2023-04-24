import PropTypes from 'prop-types';
import { Ul, Li, Image } from './PicturesDataView.styled';

const PicturesDataView = ({ pictures, onImageClick }) => (
  <Ul>
    {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
      <Li key={String(id)}>
        <Image
          src={webformatURL}
          alt={tags}
          onClick={() => onImageClick(id, largeImageURL, tags)}
        />
      </Li>
    ))}
  </Ul>
);

export default PicturesDataView;

PicturesDataView.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
