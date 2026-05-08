// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router";
// import "../form.style.scss";
// import { useAuth } from "../hooks/useAuth";
// const Login = () => {
//   const { loading, handleLogin } = useAuth();
//     const navigate = useNavigate()
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try{
//       await handleLogin({email , password})
//     navigate('/')
//     }catch(err){
//       console.log(err)
//       alert("Login falied")
//     }
//   };

//   if(loading){
//     return(<main><h1>Loading.....</h1></main>)
//   }
//   return (
//     <main>
//       <div className="form-container">
//         <h1>Login</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter email"
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//             />
//           </div>

//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter password"
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//             />
//           </div>
//           <button className="button primary-button">Login</button>
//         </form>
//         <p>
//           Don't have an account? <Link to={"/register"}>Register</Link>
//         </p>
//       </div>
//     </main>
//   );
// };

// export default Login;



import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import "../form.style.scss";
import { useAuth } from "../hooks/useAuth";
import LoginLoadingScreen from "./Loginloadingscreen";

const Login = () => {
    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!loading) return;

        const chars = document.querySelectorAll('.char-box');
        let idx = 0;
        const interval = setInterval(() => {
            if (idx < chars.length) {
                chars[idx].classList.add('filled');
                idx++;
            } else {
                clearInterval(interval);
            }
        }, 220);

        const container = document.getElementById('particles');
        if (container) {
            for (let i = 0; i < 12; i++) {
                const p = document.createElement('div');
                p.className = 'particle';
                p.style.left = (10 + Math.random() * 80) + '%';
                p.style.bottom = (Math.random() * 30) + '%';
                p.style.animationDuration = (2 + Math.random() * 3) + 's';
                p.style.animationDelay = (Math.random() * 3) + 's';
                const size = (4 + Math.random() * 5) + 'px';
                p.style.width = size;
                p.style.height = size;
                container.appendChild(p);
            }
        }

        return () => clearInterval(interval);
    }, [loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin({ email, password });
            navigate('/');
        } catch (err) {
            console.log(err);
            alert("Login failed");
        }
    };

    if (loading) {
        return <LoginLoadingScreen />;
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="button primary-button">Login</button>
                </form>
                <p>
                    Don't have an account? <Link to={"/register"}>Register</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;