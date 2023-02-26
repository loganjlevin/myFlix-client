import React from 'react';
import { useState } from 'react';

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
    <>
      Login:
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            minLength={5}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LoginView;
