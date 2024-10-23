import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to the Disaster Response and Relief Coordination App</h1>
        <p>Your reliable partner in managing disaster response effectively.</p>
      </header>
      <section className="features">
        <h2>Key Features</h2>
        <ul>
          <li>Real-time communication tools for responders</li>
          <li>Resource allocation tracking</li>
          <li>Interactive maps for situational awareness</li>
          <li>Collaboration tools for agencies and volunteers</li>
        </ul>
      </section>
      <section className="call-to-action">
        <h2>Get Started</h2>
        <p>Join us in making a difference. Sign up to get involved!</p>
        <Link to="/signup" className="cta-button">Sign Up</Link> {/* Use Link here */}
      </section>
    </div>
  );
}

export default Home;