// src/components/Signup.js
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    userType: 0, // Default userType is Applicant (0)
    profileHeadline: "",
    resume: null,
    skills: "",
    education: "",
    experience: "",
    phone: "",
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle userType change and reset applicant fields if switching to Recruiter
    if (name === "userType" && value === "1") {
      // Reset applicant-specific fields when switching to Recruiter
      setFormData({
        ...formData,
        userType: parseInt(value),
        resume: null,
        skills: "",
        education: "",
        experience: "",
        phone: "",
      });
    } else if (name === "userType") {
      // Keep the existing formData when switching to Applicant
      setFormData({
        ...formData,
        userType: parseInt(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== "") {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Log formData to debug
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch("https://localhost:7243/api/User/signup", {
        method: "POST",
        body: formDataToSend,
      });

      const responseText = await response.text();
      console.log(responseText);

      try {
        const result = JSON.parse(responseText);
        if (response.ok) {
          alert(result.message);
        } else {
          console.error(result.errors || "Error response:", result);
          alert(result.errors || "An error occurred during signup");
        }
      } catch (parseError) {
        console.error("Error parsing response:", parseError, responseText);
        alert("Failed to parse server response");
      }
    } catch (error) {
      console.error("Network or server error:", error);
      alert("An error occurred while connecting to the server");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center">Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formUserType">
              <Form.Label>User Type</Form.Label>
              <Form.Control
                as="select"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="0">Applicant</option>
                <option value="1">Recruiter</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formProfileHeadline">
              <Form.Label>Profile Headline</Form.Label>
              <Form.Control
                type="text"
                name="profileHeadline"
                value={formData.profileHeadline}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Conditionally render these fields only if userType is Applicant (0) */}
            {formData.userType === 0 && (
              <>
                <Form.Group controlId="formResume">
                  <Form.Label>Resume</Form.Label>
                  <Form.Control
                    type="file"
                    name="resume"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formSkills">
                  <Form.Label>Skills</Form.Label>
                  <Form.Control
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formEducation">
                  <Form.Label>Education</Form.Label>
                  <Form.Control
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formExperience">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
