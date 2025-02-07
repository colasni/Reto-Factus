import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import api from "../api/apiFactus";
import { useAuth } from "../context/AuthContext";

const LoginModal = ({ show, handleClose }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/oauth/token", {
        grant_type: "password",
        client_id: "9deb6664-f5f0-4d92-a8b7-80d35c902962",
        client_secret: "nvLYspesQuKw4o26adBCdZBQEiobj0VwdvgSB0ov",
        username: credentials.email,
        password: credentials.password,
      });

      if (response.data?.access_token) {
        login(response.data.access_token); // Guarda el token y cierra el modal
      }
    } catch (err) {
      setError("Error en las credenciales");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={credentials.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : "Sign In"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
