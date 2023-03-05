import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={`/`}>
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to={`/login`}>
                  <Button variant="primary">Login</Button>
                </Nav.Link>
                <Nav.Link as={Link} to={`/signup`}>
                  <Button variant="primary">Signup</Button>
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to={`/`}>
                  <Button variant="primary">Home</Button>
                </Nav.Link>
                <Nav.Link as={Link} to={`/profile`}>
                  <Button variant="primary">Profile</Button>
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  <Button variant="primary">Logout</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
