// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "../../redux/actions/loginAction";

const MyNavbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userType } = useSelector((state) => state.login);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    dispatch(resetStore());
    navigate("/login"); // Redirect to login
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleJobPortal = () => {
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleJobs = () => {
    navigate("/jobs");
  };

  const handleCreateJob = () => {
    navigate("/createjob");
  };

  const handleResume = () => {
    navigate("/allresume");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={handleJobPortal}>JobPortal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isAuthenticated && (
              <Nav.Link onClick={handleSignup}>Sign Up</Nav.Link>
            )}
            {isAuthenticated ? (
              <>
                <Nav.Link onClick={handleProfile}>Profile</Nav.Link>

                {userType === "Admin" && (
                  <>
                    <Nav.Link onClick={handleCreateJob}>Create Job</Nav.Link>
                    <Nav.Link onClick={handleResume}>View Resumes</Nav.Link>
                  </>
                )}
              </>
            ) : (
              <Nav.Link onClick={handleLogin}>Login</Nav.Link>
            )}
            <Nav.Link onClick={handleJobs}>View Jobs</Nav.Link>
          </Nav>
          {/* Logout button aligned to the right */}
          {isAuthenticated && (
            <Nav className="ms-auto">
              <Button variant="outline-primary" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
