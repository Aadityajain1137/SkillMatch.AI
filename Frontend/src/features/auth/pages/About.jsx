// components/About.jsx
import React from "react";
import "./About.scss";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About <span className="highlight">SkillMatch.AI</span></h1>
        <p>Revolutionizing interview preparation with artificial intelligence</p>
      </div>

      <div className="about-content">
        <section className="mission-section">
          <div className="mission-card">
            <div className="mission-icon">🎯</div>
            <h2>Our Mission</h2>
            <p>To empower job seekers with personalized AI-driven interview strategies that bridge the gap between their current skills and dream job requirements.</p>
          </div>
        </section>

        <section className="features-section">
          <h2>Why Choose <span className="highlight">SkillMatch.AI</span>?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Analysis</h3>
              <p>Advanced algorithms analyze job descriptions and match them with your unique profile</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Smart Gap Analysis</h3>
              <p>Identify skill gaps and get targeted recommendations for improvement</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗓️</div>
              <h3>Personalized Roadmap</h3>
              <p>Customized preparation plans tailored to your timeline and goals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Expert Questions</h3>
              <p>Curated technical and behavioral questions with model answers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Progress Tracking</h3>
              <p>Monitor your improvement across multiple interview preparations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Instant Results</h3>
              <p>Get your personalized interview strategy in under 30 seconds</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <h2>Impact by the Numbers</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Interviews Prepared</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.9/5</div>
              <div className="stat-label">User Rating</div>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">👨‍💻</div>
              <h3>Aaditya Jain</h3>
              <p>CEO & Founder</p>
              <div className="team-bio">Ex-Google AI Engineer</div>
            </div>
            <div className="team-card">
              <div className="team-avatar">👩‍🔬</div>
              <h3>Sarah Johnson</h3>
              <p>Head of AI Research</p>
              <div className="team-bio">PhD in Machine Learning</div>
            </div>
            <div className="team-card">
              <div className="team-avatar">👨‍🎨</div>
              <h3>Michael Rodriguez</h3>
              <p>Product Designer</p>
              <div className="team-bio">UX Design Expert</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;