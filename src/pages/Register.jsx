import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './login-register.css';
import './mediaqueries.css';

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmed_password: "",
    PIN: ""
  });
  const [bool, setBool] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(""); 
  const [back_error, setback_error] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === "password" || name === "confirmed_password") {
      setBool(false);
    }
    if (error) setError("");
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function toggleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }
  const handleGoogleAuth = () => {
    window.location.href = import.meta.env.VITE_API_BASE_URL + "/auth/google";
  };

  async function handleSubmit(event) {
  event.preventDefault();
  setError("");
  setback_error("");
  if (data.password !== data.confirmed_password) {
    setBool(true);
    return;
  }

  setLoading(true);

  try {
    // In Register.jsx
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/signup", { // Use the proxy prefix
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password,
          pin: data.PIN
        }),
    });
    const result = await response.json();

    if (!response.ok) {
      setback_error(result.message || "Something went wrong");
    } else {
      console.log("✅ Success:", result);
      setback_error(""); 
      alert("Registration successful! ");
      localStorage.clear();
      localStorage.setItem("token", result.token); 
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("Time", Date.now().toString());
      navigate("/"); 
    }
  } catch (error) {
    console.error("Error:", error);
    setback_error("Something went wrong. Please try again later.");
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="body">
      <div className="register-container">
        <div className="first">
          <div>
            <img className="register_image" src="/login_part.png" alt="Register Illustration"/>
          </div>
        </div>
        <div className="second">
          <div>
            <div className="form-head">
              <h1>Create an Account</h1>
            </div>
            <form className="form-contents" onSubmit={handleSubmit}>
              <input 
                className="form-content" 
                placeholder="Full Name" 
                value={data.name} 
                name="name" 
                onChange={handleChange} 
                required 
              />
              <input 
                className="form-content" 
                placeholder="Email" 
                value={data.email} 
                name="email" 
                onChange={handleChange} 
                type="email" 
                required 
              />

              <div style={{ position: "relative", width: "100%" }}>
                <input
                  className="form-content"
                  placeholder="Password"
                  value={data.password}
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  style={{ paddingRight: "40px" }}
                  required
                />
                {showPassword ? (
                  <VisibilityOffIcon className="eyeIcon" style={{color:"black"}} onClick={toggleShowPassword} />
                ) : (
                  <VisibilityIcon className="eyeIcon" onClick={toggleShowPassword} />
                )}
              </div>

              <div style={{ position: "relative", width: "100%" }}>
                <input
                  className="form-content"
                  placeholder="Confirm Password"
                  value={data.confirmed_password}
                  name="confirmed_password"
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  style={{ paddingRight: "40px" }}
                  required
                />
                {showConfirmPassword ? (
                  <VisibilityOffIcon className="eyeIcon" style={{color:"black"}} onClick={toggleShowConfirmPassword} />
                ) : (
                  <VisibilityIcon className="eyeIcon" onClick={toggleShowConfirmPassword} />
                )}
              </div>

              {bool && <p className="error-handle">⚠ Passwords do not match</p>}
              <input 
                className="form-content" 
                placeholder="PIN" 
                value={data.PIN} 
                name="PIN" 
                onChange={handleChange} 
                type="password"
                required 
              />
              <button type="submit" className="register-button" disabled={loading}>
                {loading ? "⏳ Registering..." : "Register"}
              </button>
              {error && <p className="error-handle">{error}</p>}
              {back_error && <p className="error-handle">{back_error}</p>}
            </form>
            <div className="separator">
              <hr />
              <span>OR CONTINUE WITH</span>
              <hr />
            </div>

            <button className="sign-up-button"  onClick={handleGoogleAuth}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 533.5 544.3">
                <path fill="#4285F4" d="M533.5 278.4c0-18.2-1.5-36-4.3-53.2H272v100.8h147.1c-6.4 34.4-25.5 63.5-54.5 83v68h88c51.6-47.5 80.9-117.5 80.9-198.6z"/>
                <path fill="#34A853" d="M272 544.3c73.5 0 135.3-24.4 180.4-66.5l-88-68c-24.4 16.3-55.5 25.9-92.4 25.9-71.1 0-131.4-48-153-112.5h-90v70.7c45.2 89.5 137.8 150.4 243 150.4z"/>
                <path fill="#FBBC04" d="M119 323.2c-10.7-31.9-10.7-66.4 0-98.3v-70.8h-90c-37.2 73.7-37.2 159.1 0 232.8l90-70.7z"/>
                <path fill="#EA4335" d="M272 107.7c38.9-.6 76 13.6 104.5 39.3l78-78C417.3 26 347.4-1.5 272 0 165.8 0 73.2 60.9 28 150.4l90 70.8C140.6 155.7 200.9 107.7 272 107.7z"/>
              </svg>
              <span>Register with Google</span>
            </button>

            <div className="form-link">
              <p>Already have an account? <Link to="/Login">Login here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;