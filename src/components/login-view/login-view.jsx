import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch('https://myflix-d2kt.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', JSON.stringify(data.token));
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((error) => alert('Something went wrong!'));
  };
  return (
    <Form onSubmit={handleSubmit}>
      Login
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          minLength={5}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>
          Password:
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Label>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LoginView;
