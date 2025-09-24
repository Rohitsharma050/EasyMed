import { useState } from "react";
import Login from "./Login.jsx";
import { NavLink, useNavigate } from "react-router-dom";

export default function HomeNavbar() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate(); // Corrected spelling

  const handleLoginClick = () => {
    setShowLogin(true);
    // The modal will open, and we don't need to navigate to a new route for it
    // If you do want to navigate, you should remove the modal logic
    // and rely on a full login page component.
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 shadow-md fixed top-0 left-0 w-full bg-white z-50 opacity-90">
        <div>
          <h1 className="text-3xl font-bold text-blue-500">EasyMed</h1>
        </div>
        <div>
          <ul className="flex gap-8 font-semibold">
            <a href="/">Home</a>
            {/* Correctly using NavLink for routing */}
            

            {/* Using a standard <a> tag for the anchor link to the footer */}
            <a href="#contact" className={({ isActive }) => (isActive ? "text-blue-500" : "text-black")}>
              Contact
            </a>
          </ul>
        </div>
        <div className="flex justify-around gap-x-4">
          <button
            onClick={handleLoginClick}
            
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            SignUp
          </button>
        </div>
      </div>

      <Login isLogin={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}