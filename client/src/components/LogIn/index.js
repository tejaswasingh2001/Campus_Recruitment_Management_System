import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const LogIn = ({
  email,
  password,
  handleChange,
  handleSubmit,
  isProcessing,
  error,
  handleGoogleLogin,
  dismissAlert,
}) => {
  const onSuccess = async (response) => {
    console.log('Success', response);
    const user = await jwtDecode(response.credential);
    console.log('user details', user);
    handleGoogleLogin(user.email, 'Student01');
  };

  const onError = (error) => {
    console.log('Error', error);
  };

  return (
    <Container className="col-md-4">
      <Card className="shadow-sm">
        <Card.Header as="h2" className="text-center">
          Log In
        </Card.Header>
        <Card.Body>
          <Alert
            variant="danger"
            show={error}
            dismissible
            onClose={dismissAlert}
          >
            {error}
          </Alert>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                disabled={isProcessing}
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                disabled={isProcessing}
              />
            </Form.Group>
            <Button variant="success" type="submit" disabled={isProcessing}>
              {isProcessing ? 'Logging In...' : 'Log In'}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          Don't have an account? <Link to={ROUTES.SIGN_UP}>Create One</Link>
        </Card.Footer>
      </Card>
      <br />
      <GoogleLogin onSuccess={onSuccess} onError={onError} />
    </Container>
  );
};

LogIn.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  error: PropTypes.string,
  dismissAlert: PropTypes.func.isRequired,
};

export default LogIn;
