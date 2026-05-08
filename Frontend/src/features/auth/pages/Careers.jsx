// components/Careers.jsx
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "./Careers.scss";

const Careers = () => {
  const { user } = useAuth();
  const [selectedJob, setSelectedJob] = useState(null);
  const [application, setApplication] = useState({
    name: "",
    email: "",
    experience: "",
    coverLetter: ""
  });

  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      salary: "$120k - $160k",
      description: "We're looking for an experienced full-stack developer to lead our frontend architecture and build scalable React applications.",
      requirements: [
        "5+ years of experience with React and Node.js",
        "Strong understanding of modern JavaScript/TypeScript",
        "Experience with MongoDB and RESTful APIs",
        "Knowledge of cloud platforms (AWS/GCP)",
        "Excellent problem-solving skills"
      ]
    },
    {
      id: 2,
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: "$130k - $180k",
      description: "Join our AI team to build and optimize machine learning models for interview preparation and skill matching.",
      requirements: [
        "3+ years of experience in ML/AI development",
        "Strong background in Python and TensorFlow/PyTorch",
        "Experience with NLP and LLMs",
        "Knowledge of data processing pipelines",
        "MS/PhD in Computer Science or related field"
      ]
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      salary: "$110k - $150k",
      description: "Lead product strategy and development for our core interview preparation platform.",
      requirements: [
        "4+ years of product management experience",
        "Background in EdTech or HR Tech preferred",
        "Strong analytical and communication skills",
        "Experience with agile methodologies",
        "User-centric mindset"
      ]
    },
    {
      id: 4,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: "$90k - $130k",
      description: "Create beautiful and intuitive user experiences for our AI-powered platform.",
      requirements: [
        "3+ years of UX/UI design experience",
        "Proficiency in Figma and design systems",
        "Strong portfolio demonstrating web applications",
        "Understanding of user research methods",
        "Experience with responsive design"
      ]
    }
  ];

  const handleApply = (job) => {
    if (!user) {
      alert("Please login to apply for this position");
      return;
    }
    setSelectedJob(job);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    alert(`Application submitted for ${selectedJob.title}! We'll review your application and get back to you soon.`);
    setSelectedJob(null);
    setApplication({ name: "", email: "", experience: "", coverLetter: "" });
  };

  return (
    <div className="careers-page">
      <div className="careers-hero">
        <h1>Join Our <span className="highlight">Team</span></h1>
        <p>Help us revolutionize the way people prepare for interviews</p>
      </div>

      <div className="careers-content">
        <div className="culture-section">
          <h2>Why Work at <span className="highlight">SkillMatch.AI</span>?</h2>
          <div className="culture-grid">
            <div className="culture-card">
              <div className="culture-icon">💪</div>
              <h3>Impact-Driven</h3>
              <p>Make a real difference in people's careers and lives</p>
            </div>
            <div className="culture-card">
              <div className="culture-icon">🌍</div>
              <h3>Fully Remote</h3>
              <p>Work from anywhere in the world</p>
            </div>
            <div className="culture-card">
              <div className="culture-icon">📈</div>
              <h3>Growth Mindset</h3>
              <p>Continuous learning and development opportunities</p>
            </div>
            <div className="culture-card">
              <div className="culture-icon">🎉</div>
              <h3>Great Benefits</h3>
              <p>Competitive salary, equity, and health benefits</p>
            </div>
          </div>
        </div>

        <div className="jobs-section">
          <h2>Open Positions</h2>
          <div className="jobs-list">
            {jobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <div>
                    <h3>{job.title}</h3>
                    <div className="job-meta">
                      <span className="job-tag">{job.department}</span>
                      <span className="job-tag">{job.location}</span>
                      <span className="job-tag">{job.type}</span>
                    </div>
                  </div>
                  <div className="job-salary">{job.salary}</div>
                </div>
                <p className="job-description">{job.description}</p>
                <div className="job-requirements">
                  <strong>Requirements:</strong>
                  <ul>
                    {job.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
                <button 
                  className="apply-btn"
                  onClick={() => handleApply(job)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Apply for {selectedJob.title}</h2>
            <form onSubmit={handleSubmitApplication}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  value={application.name}
                  onChange={(e) => setApplication({...application, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  required
                  value={application.email}
                  onChange={(e) => setApplication({...application, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Years of Experience *</label>
                <input
                  type="text"
                  required
                  value={application.experience}
                  onChange={(e) => setApplication({...application, experience: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Cover Letter / Why you'd be a great fit *</label>
                <textarea
                  required
                  rows="5"
                  value={application.coverLetter}
                  onChange={(e) => setApplication({...application, coverLetter: e.target.value})}
                ></textarea>
              </div>
              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setSelectedJob(null)}>Cancel</button>
                <button type="submit" className="submit-btn">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;