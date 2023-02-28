import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import {
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  Container,
  Form,
} from "react-bootstrap";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = JSON.parse(localStorage.getItem("token"));
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflix-d2kt.onrender.com/movies", {
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
    if (selectedMovie) {
      setSimilarMovies(
        movies.filter((movie) => {
          return (
            movie.Genre.Name === selectedMovie.Genre.Name &&
            movie.Title !== selectedMovie.Title
          );
        })
      );
    }
  }, [selectedMovie]);

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">myFlix</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            {user ? (
              <Form inline>
                <Button
                  variant="primary"
                  onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                  }}
                >
                  Logout
                </Button>
              </Form>
            ) : (
              <></>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <>
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={() => {
                  setSelectedMovie(null);
                }}
              />
            </Col>
            <Col md={12} className="mt-5 text-white">
              <h2>Similar Movies</h2>
            </Col>

            {similarMovies.map((movie) => {
              return (
                <Col className="mb-4" key={movie._id} md={3}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={() => {
                      setSelectedMovie(movie);
                    }}
                  />
                </Col>
              );
            })}
          </>
        ) : movies.length === 0 ? (
          <div>Movie list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => {
              return (
                <Col className="mt-3 mb-3" key={movie._id} md={3}>
                  <MovieCard
                    movie={movie}
                    onMovieClick={() => {
                      setSelectedMovie(movie);
                    }}
                  />
                </Col>
              );
            })}
            <Col md={12}></Col>
          </>
        )}
      </Row>
    </>
  );
};

export default MainView;
