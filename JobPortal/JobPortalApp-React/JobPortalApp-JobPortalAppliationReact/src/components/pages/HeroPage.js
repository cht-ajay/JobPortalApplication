import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HeroPage.css'; // Ensure the CSS file exists and is in the correct path

const HeroPage = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/signup'); // Navigate to the signup page
    };

    return (
        <div className="hero-section">
            <Container>
                <h1 className="display-4">Welcome to JobPortal</h1>
                <p className="lead">Find your dream job or post a job vacancy</p>
                <Button variant="primary" onClick={handleButtonClick}>
                    Get Started
                </Button>
            </Container>
        </div>
    );
};

export default HeroPage;
