

// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router";
// import "../form.style.scss";
// import { useAuth } from "../hooks/useAuth";
// import LoginLoadingScreen from "./Loginloadingscreen";

// const Login = () => {
//     const { loading, handleLogin } = useAuth();
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     useEffect(() => {
//         if (!loading) return;

//         const chars = document.querySelectorAll('.char-box');
//         let idx = 0;
//         const interval = setInterval(() => {
//             if (idx < chars.length) {
//                 chars[idx].classList.add('filled');
//                 idx++;
//             } else {
//                 clearInterval(interval);
//             }
//         }, 220);

//         const container = document.getElementById('particles');
//         if (container) {
//             for (let i = 0; i < 12; i++) {
//                 const p = document.createElement('div');
//                 p.className = 'particle';
//                 p.style.left = (10 + Math.random() * 80) + '%';
//                 p.style.bottom = (Math.random() * 30) + '%';
//                 p.style.animationDuration = (2 + Math.random() * 3) + 's';
//                 p.style.animationDelay = (Math.random() * 3) + 's';
//                 const size = (4 + Math.random() * 5) + 'px';
//                 p.style.width = size;
//                 p.style.height = size;
//                 container.appendChild(p);
//             }
//         }

//         return () => clearInterval(interval);
//     }, [loading]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await handleLogin({ email, password });
//             navigate('/');
//         } catch (err) {
//             console.log(err);
//             alert("Login failed");
//         }
//     };

//     if (loading) {
//         return <LoginLoadingScreen />;
//     }

//     return (
//         <main>
//             <div className="form-container">
//                 <h1>Login</h1>
//                 <form onSubmit={handleSubmit}>
//                     <div className="input-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             placeholder="Enter email"
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             placeholder="Enter password"
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <button className="button primary-button">Login</button>
//                 </form>
//                 <p>
//                     Don't have an account? <Link to={"/register"}>Register</Link>
//                 </p>
//             </div>
//         </main>
//     );
// };

// export default Login;







import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import LoginLoadingScreen from "./Loginloadingscreen";
import "../form.style.scss";

const Login = () => {
    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await handleLogin({ email, password });
            navigate("/");
        } catch (err) {
            console.log(err);
            alert("Login failed");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <LoginLoadingScreen />;

    return (
        <main>
            {/* ── Left panel ── */}
            <div className="auth-left">
                <div className="auth-left__bg-grid" />
                <div className="auth-left__blob auth-left__blob--1" />
                <div className="auth-left__blob auth-left__blob--2" />

                <div className="auth-brand">
                    <div className="auth-brand__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14" />
                            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14" />
                        </svg>
                    </div>
                    <span className="auth-brand__name">
                        Skill<span>Match</span>.AI
                    </span>
                </div>

                <div className="auth-hero">
                    <div className="auth-hero__badge">
                        <span className="auth-hero__badge-dot" />
                        AI-powered career intelligence
                    </div>
                    <h1 className="auth-hero__title">
                        Land your<br />
                        <em>dream job</em><br />
                        faster.
                    </h1>
                    <p className="auth-hero__sub">
                        Upload your resume &amp; job description. Get instant ATS scores, skill gaps, and interview prep — all in one place.
                    </p>
                </div>

                <ul className="auth-features">
                    <li className="auth-feature">
                        <span className="auth-feature__icon auth-feature__icon--green">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/></svg>
                        </span>
                        <span>ATS-friendly resume builder</span>
                    </li>
                    <li className="auth-feature">
                        <span className="auth-feature__icon auth-feature__icon--purple">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                        </span>
                        <span>Skill gap analysis &amp; recommendations</span>
                    </li>
                    <li className="auth-feature">
                        <span className="auth-feature__icon auth-feature__icon--amber">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </span>
                        <span>Behaviour &amp; interview question generator</span>
                    </li>
                    <li className="auth-feature">
                        <span className="auth-feature__icon auth-feature__icon--blue">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
                        </span>
                        <span>Job match score &amp; deep analysis</span>
                    </li>
                </ul>
            </div>

            {/* ── Right panel ── */}
            <div className="auth-right">
                <div className="auth-tabs">
                    <Link to="/login" className="auth-tab auth-tab--active">Log in</Link>
                    <Link to="/register" className="auth-tab">Create account</Link>
                </div>

                <p className="auth-form__eyebrow">Welcome back</p>
                <h2 className="auth-form__title">Sign in to continue</h2>
                <p className="auth-form__sub">
                    New here?{" "}
                    <Link to="/register">Create a free account →</Link>
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="email" className="field__label">Email address</label>
                        <div className="field__wrap">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <svg className="field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="password" className="field__label">Password</label>
                        <div className="field__wrap">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <svg className="field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </div>
                        <div className="field__footer">
                            <a href="#" className="field__forgot">Forgot password?</a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={submitting}
                    >
                        {submitting ? "Signing in…" : "Sign in to SkillMatch.AI →"}
                    </button>
                </form>
            </div>
        </main>
    );
};


export default Login;