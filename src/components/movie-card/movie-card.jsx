import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 bg-secondary text-white" onClick={onMovieClick}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
      </Card.Body>
    </Card>
  );
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
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
    ImagePath: PropTypes.string,
    Featured: PropTypes.bool,
  }),
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
