// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import { useAuth } from "../hooks/useAuth";
// import "./Navbar.scss";

// const Navbar = () => {
//   const { user, handleLogout } = useAuth();
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const onLogout = async () => {
//     await handleLogout();
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       {/* Logo */}
//       <Link to="/" className="navbar__logo">
//         <span className="navbar__logo-icon"><img src="SkillMatchLogo.png" alt="" className="navbar__logo-icon"/></span>
//         <span className="navbar__logo-text">
//           SkillMatch<span className="navbar__logo-accent">.AI</span>
//         </span>
//       </Link>

//       {/* Center Nav Links */}
//       <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
//         <li>
//           <Link to="/" className="navbar__link" onClick={() => setMenuOpen(false)}>
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link to="/about" className="navbar__link" onClick={() => setMenuOpen(false)}>
//             About
//           </Link>
//         </li>
//         <li>
//           <Link to="/careers" className="navbar__link" onClick={() => setMenuOpen(false)}>
//             Careers
//           </Link>
//         </li>
//       </ul>

//       {/* Right Side: Auth Buttons */}
//       <div className="navbar__auth">
//         {user ? (
//           <div className="navbar__user">
//             <span className="navbar__username">👤 {user.username}</span>
//             <button className="navbar__btn navbar__btn--logout" onClick={onLogout}>
//               Logout
//             </button>
//           </div>
//         ) : (
//           <>
//             <Link to="/login" className="navbar__btn navbar__btn--ghost">
//               Login
//             </Link>
//             <Link to="/register" className="navbar__btn navbar__btn--primary">
//               Register
//             </Link>
//           </>
//         )}
//       </div>

//       {/* Mobile Hamburger */}
//       <button
//         className="navbar__hamburger"
//         onClick={() => setMenuOpen((prev) => !prev)}
//         aria-label="Toggle menu"
//       >
//         <span />
//         <span />
//         <span />
//       </button>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "./Navbar.scss";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar__logo">
        <img 
          src="SkillMatchLogo.png" 
          alt="SkillMatch Logo" 
          className="navbar__logo-img"
        />
        <span className="navbar__logo-text">
          SkillMatch<span className="navbar__logo-accent">.AI</span>
        </span>
      </Link>

      {/* Center Nav Links */}
      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        <li>
          <Link to="/" className="navbar__link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="navbar__link" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </li>
        <li>
          <Link to="/careers" className="navbar__link" onClick={() => setMenuOpen(false)}>
            Careers
          </Link>
        </li>
      </ul>

      {/* Right Side: Auth Buttons */}
      <div className="navbar__auth">
        {user ? (
          <div className="navbar__user">
            <span className="navbar__username">👤 {user.username}</span>
            <button className="navbar__btn navbar__btn--logout" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="navbar__btn navbar__btn--ghost">
              Login
            </Link>
            <Link to="/register" className="navbar__btn navbar__btn--primary">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="navbar__hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
};

export default Navbar;