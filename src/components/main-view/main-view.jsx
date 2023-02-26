import { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = JSON.parse(localStorage.getItem('token'));
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch('https://myflix-d2kt.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <br />
        <SignupView />
      </>
    );
  }
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
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default MainView;
