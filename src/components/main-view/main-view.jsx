import { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://myflix-d2kt.onrender.com/movies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (movies.length === 0) {
    return <div>Movie list is empty!</div>;
  }

  if (selectedMovie) {
    let similarMovies = movies.filter((movie) => {
      return (
        movie.Genre.Name === selectedMovie.Genre.Name &&
        movie.Title !== selectedMovie.Title
      );
    });
    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => {
            setSelectedMovie(null);
          }}
        />
        <h2>Similar Movies</h2>
        <hr />
        {similarMovies.map((movie) => {
          return (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={() => {
                setSelectedMovie(movie);
              }}
            />
          );
        })}
      </>
    );
  }
  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={() => {
              setSelectedMovie(movie);
            }}
          />
        );
      })}
    </div>
  );
};

export default MainView;
