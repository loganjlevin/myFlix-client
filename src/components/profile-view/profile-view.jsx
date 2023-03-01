import { useState } from 'react';
import { Form, Button, Container, Col } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';
const ProfileView = ({
  user,
  token,
  setUser,
  setToken,
  favoriteMovies,
  addFavorite,
  removeFavorite,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const updateUser = (event) => {
    event.preventDefault();

    const updatedUser = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`https://myflix-d2kt.onrender.com/users/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        alert('Update failed');
        console.error(error);
      });
  };

  const deleteUser = () => {
    fetch(`https://myflix-d2kt.onrender.com/users/${user._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        alert('Your profile was succesfully deleted');
        setUser(null);
        setToken(null);
        localStorage.clear();
        window.location.reload();
      } else {
        alert('Error attempting to delete');
      }
    });
  };

  return (
    <>
      <Col md={4}>
        <Container className="bg-secondary mt-3 mb-3 text-white rounded p-3">
          <h4>Your Info</h4>
          <p>Userame: {user.Username}</p>
          <p>Email: {user.Email}</p>
          <p>Birthday: {user.Birthday.slice(0, 10)}</p>
          <Button variant="primary" onClick={deleteUser}>
            Delete Profile
          </Button>
        </Container>
      </Col>
      <Col md={4}>
        <Container className="bg-secondary mt-3 mb-3 text-white rounded p-3">
          <Form onSubmit={updateUser}>
            <h4>Update information</h4>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                className="bg-white"
                type="text"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                required
                minLength={5}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                className="bg-white"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className="bg-white"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBirthday" className="mb-3">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                className="bg-white"
                type="date"
                value={birthday}
                onChange={(event) => {
                  setBirthday(event.target.value);
                }}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </Col>
      {favoriteMovies.length !== 0 && (
        <Col md={12} className="mt-5 text-white">
          <h2>Favorite Movies</h2>
        </Col>
      )}
      {favoriteMovies.map((movie) => {
        return (
          <Col className="mb-4" key={movie._id} md={3}>
            <MovieCard
              movie={movie}
              favoriteMovies={favoriteMovies}
              addFavorite={() => addFavorite(user._id, movie._id)}
              removeFavorite={() => removeFavorite(user._id, movie._id)}
            />
          </Col>
        );
      })}
    </>
  );
};

export default ProfileView;
