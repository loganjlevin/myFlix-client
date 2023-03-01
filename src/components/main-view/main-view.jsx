import { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';
import NavigationBar from '../navigation-bar/navigation-bar';
import ProfileView from '../profile-view/profile-view';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = JSON.parse(localStorage.getItem('token'));
  const [movies, setMovies] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://myflix-d2kt.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(
          data.sort((a, b) => {
            if (a.Title < b.Title) {
              return -1;
            }
            if (a.Title > b.Title) {
              return 1;
            }
            return 0;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  useEffect(() => {
    if (!token) {
      return;
    }
    let favorites = movies.filter((movie) =>
      user.FavoriteMovies.includes(movie._id)
    );
    setFavoriteMovies(favorites);
  }, [token]);

  const addFavorite = (userId, movieId) => {
    fetch(
      `https://myflix-d2kt.onrender.com/users/${userId}/movies/${movieId}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(
        setFavoriteMovies((oldArray) => [
          ...oldArray,
          movies.find((movie) => movie._id === movieId),
        ])
      )
      .catch((error) => {
        console.error(error);
      });
  };

  const removeFavorite = (userId, movieId) => {
    fetch(
      `https://myflix-d2kt.onrender.com/users/${userId}/movies/${movieId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(
        setFavoriteMovies((oldArray) =>
          oldArray.filter((movie) => movie._id !== movieId)
        )
      )
      .catch((error) => console.error(error));
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />

      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <MovieView
                    movies={movies}
                    similarMovies={similarMovies}
                    setSimilarMovies={setSimilarMovies}
                    favoriteMovies={favoriteMovies}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                    user={user}
                  />
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="my-3" key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          favoriteMovies={favoriteMovies}
                          addFavorite={() => addFavorite(user._id, movie._id)}
                          removeFavorite={() =>
                            removeFavorite(user._id, movie._id)
                          }
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView
                    user={user}
                    token={token}
                    setUser={setUser}
                    setToken={setToken}
                    movies={movies}
                    favoriteMovies={favoriteMovies}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                  />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
