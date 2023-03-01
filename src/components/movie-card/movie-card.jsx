import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, favoriteMovies, addFavorite, removeFavorite }) => {
  return (
    <Card className="h-100 bg-secondary text-white">
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card.Img variant="top" src={movie.ImagePath} />
      </Link>

      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
      </Card.Body>

      {favoriteMovies.find((m) => m._id === movie._id) ? (
        <Button className="m-2" onClick={removeFavorite}>
          Remove Favorite
        </Button>
      ) : (
        <Button className="m-2" onClick={addFavorite}>
          Add Favorite
        </Button>
      )}
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
  favoriteMovies: PropTypes.array,
};

export default MovieCard;
