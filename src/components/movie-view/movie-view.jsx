import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Button, Card, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';

const MovieView = ({ movies, similarMovies, setSimilarMovies }) => {
  const { movieId } = useParams();
  const selectedMovie = movies.find((movie) => movie._id === movieId);

  useEffect(() => {
    setSimilarMovies(
      movies.filter((movie) => {
        return (
          movie.Genre.Name === selectedMovie.Genre.Name &&
          movie.Title !== selectedMovie.Title
        );
      })
    );
  }, [selectedMovie]);

  return (
    <>
      <Col md={8}>
        <Card className="bg-secondary text-white my-4">
          <Card.Img variant="top" src={selectedMovie.ImagePath} />
          <Card.Body>
            <Card.Title>{selectedMovie.Title}</Card.Title>
            <Card.Text>{selectedMovie.Description}</Card.Text>
            <Card.Text>Genre: {selectedMovie.Genre.Name}</Card.Text>
            <Card.Text>Director: {selectedMovie.Director.Name}</Card.Text>
            <Link to={`/`}>
              <Button>Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
      {similarMovies.length !== 0 && (
        <Col md={12} className="mt-5 text-white">
          <h2>Similar Movies</h2>
        </Col>
      )}
      {similarMovies.map((movie) => {
        return (
          <Col className="mb-4" key={movie._id} md={3}>
            <MovieCard movie={movie} />
          </Col>
        );
      })}
    </>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }),
};

export default MovieView;
