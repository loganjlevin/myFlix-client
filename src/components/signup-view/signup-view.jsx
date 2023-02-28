import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://myflix-d2kt.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Container className="bg-secondary mt-5 mb-3 text-white rounded p-3">
      <Form onSubmit={handleSubmit}>
        Signup
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
  );
};

export default SignupView;
