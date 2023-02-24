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
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    );
  }
  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
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
