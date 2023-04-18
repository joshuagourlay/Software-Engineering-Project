import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
    const [opacity, setOpacity] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const name = location.state && location.state.name ? location.state.name : 'Guest';

    useEffect(() => {
        const fadeIn = setTimeout(() => {
        setOpacity(1);
        }, 2000);

        const redirect = setTimeout(() => {
        navigate('/home');
        }, 5000);

        return () => {
        clearTimeout(fadeIn);
        clearTimeout(redirect);
        };
    }, [navigate]);

    return (
        <div className="welcome-page">
        <h1 className="welcome-text" style={{ opacity: opacity }}>
            Welcome, {name}
        </h1>
        </div>
    );
}

export default Welcome;
