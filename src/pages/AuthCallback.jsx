import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      localStorage.setItem("Time", Date.now());
      navigate("/");
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
}

export default AuthCallback;