import PropTypes from 'prop-types';

const MovieCard = ({ movie, onMovieClick }) => {
  return <div onClick={onMovieClick}>{movie.Title}</div>;
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.number,
      Death: PropTypes.number,
    }),
    ImagePath: PropTypes.string,
    Featured: PropTypes.bool,
  }),
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
