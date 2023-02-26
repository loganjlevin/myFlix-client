import { useState } from 'react';

const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch('https://myflix-d2kt.onrender.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Signup successful');
        window.location.reload();
      } else {
        alert('Signup failed');
      }
    });
  };

  return (
    <>
      Signup:
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            required
            minLength={5}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Birthday:
          <input
            type="date"
            value={birthday}
            onChange={(event) => {
              setBirthday(event.target.value);
            }}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignupView;
