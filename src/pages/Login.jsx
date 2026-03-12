import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './login-register.css';
import './mediaqueries.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Visibility, setVisibility] = useState(false);
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate(); // Hook for navigation

  function handle_Email(event) {
    setEmail(event.target.value);
    if (error) setError("");
  }

  function handle_Password(event) {
    setPassword(event.target.value);
    if (error) setError("");
  }

  function handleIconClick() {
    setVisibility(!Visibility);
  }
  const handleGoogleAuth = () => {
    window.location.href = import.meta.env.VITE_API_BASE_URL + "/auth/google";
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    
    // Removed !role check as it was causing a reference error
    if (!email || !password) {
      setError("⚠ Please fill all fields");
      return; 
    }

    setLoading(true);

    try {
      // Assuming your Vite proxy is set to /api
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/signin", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Display error message from backend (e.g., "Invalid credentials")
        setError(result.message || "Login failed. Please try again.");
      } else {
        console.log("✅ Login Success:", result);
        
        // Save the token/user info to local storage
        localStorage.clear();
        localStorage.setItem("token", result.token); 
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("Time", Date.now().toString());
        
        alert("Login successful! ");
        navigate("/"); // Redirect to your wallet dashboard
      }
    } catch (err) {
      console.error("Connection Error:", err);
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="body">
      <div className="login-container">
        <div className="first">
          <div>
            <img className="login_image" src="/login_part.png" alt="Login Illustration" />
          </div>
        </div>
        <div className="second">
          <div>
            <div className="form-head">
              <h1>Welcome back!</h1>
              <p>Login to get started</p>
            </div>
            <form className="form-contents" onSubmit={handleSubmit}>
              <input
                className="form-content"
                placeholder="Enter your email here"
                onChange={handle_Email}
                name="email"
                type="email"
                value={email}
                required
              />
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  className="form-content"
                  placeholder="Enter your password"
                  onChange={handle_Password}
                  name="password"
                  value={password}
                  type={Visibility ? "text" : "password"}
                  style={{ paddingRight: "40px" }}
                  required
                />
                {Visibility ? (
                  <VisibilityOffIcon
                    className="eyeIcon"
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={handleIconClick}
                  />
                ) : (
                  <VisibilityIcon
                    className="eyeIcon"
                    style={{ cursor: "pointer" }}
                    onClick={handleIconClick}
                  />
                )}
              </div>
              
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              
              {error && <p className="error-handle" style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </form>

            <div className="separator">
              <hr />
              <span>OR CONTINUE WITH</span>
              <hr />
            </div>
            <button className="sign-in-button" type="button" onClick={handleGoogleAuth}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 533.5 544.3">
                <path fill="#4285F4" d="M533.5 278.4c0-18.2-1.5-36-4.3-53.2H272v100.8h147.1c-6.4 34.4-25.5 63.5-54.5 83v68h88c51.6-47.5 80.9-117.5 80.9-198.6z"/>
                <path fill="#34A853" d="M272 544.3c73.5 0 135.3-24.4 180.4-66.5l-88-68c-24.4 16.3-55.5 25.9-92.4 25.9-71.1 0-131.4-48-153-112.5h-90v70.7c45.2 89.5 137.8 150.4 243 150.4z"/>
                <path fill="#FBBC04" d="M119 323.2c-10.7-31.9-10.7-66.4 0-98.3v-70.8h-90c-37.2 73.7-37.2 159.1 0 232.8l90-70.7z"/>
                <path fill="#EA4335" d="M272 107.7c38.9-.6 76 13.6 104.5 39.3l78-78C417.3 26 347.4-1.5 272 0 165.8 0 73.2 60.9 28 150.4l90 70.8C140.6 155.7 200.9 107.7 272 107.7z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>  
            <div className="form-link">
              <p>Don't have an account? <Link to="/Register">Register</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
