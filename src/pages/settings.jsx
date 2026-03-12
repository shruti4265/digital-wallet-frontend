import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './dashboard.css';
import SideBar from "./dashboard-layout/sidebar";
import Header from "./dashboard-layout/header";
import ConfirmModal from "./dashboard-layout/ConfirmModel";
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
function Settings() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [userData, setuserData] = useState("");
  const [modal, setModal] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const time = localStorage.getItem("Time");
    const currentTime = Date.now();
    const timeDiff = currentTime - time;

    if (!token || timeDiff > 3600000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("Time");
      navigate("/Login");
    } else {
      const savedData = JSON.parse(localStorage.getItem("user"));
      setuserData(savedData);
      setAuthorized(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("Time");
    navigate("/Login");
  };

  const handleDelete = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/account/delete", {
      method: "DELETE", 
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    alert(data.message);
  } catch (err) {
    console.log(err);
    alert("Something went wrong.");
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("Time");
    navigate("/Login");
  }
};
const handleChangePin = async () => {
  const newPin = prompt("Enter your new PIN:");
  if (!newPin) return;
  
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/account/update-pin", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newPin })
    });
    const data = await response.json();
    alert(data.message);
  } catch (err) {
    alert("Something went wrong");
  }
};

  if (!authorized) return null;

  return (
    <div className="body">
      <div className="container">
        <SideBar />
        <div className="content">
          <Header userData={userData} />
          <div className="main-content-settings">
            <div className="User-Info">
              <h3>User Information</h3>
              <p>Name: {userData.username}</p>
              <p>Email: {userData.email}</p>
              <button className="settings-btn logout-button" onClick={() => setModal({ type: 'logout' })}>
                <LogoutIcon className="settings-icon" /> Log Out
              </button>
              <button className="settings-btn delete-button" onClick={() => setModal({ type: 'delete' })}>
                <DeleteIcon className="settings-icon" /> Delete Account
              </button>
              <button className="settings-btn change-pin-button" onClick={handleChangePin}>
                Change PIN
              </button>
            </div>
          </div>
        </div>
      </div>

      {modal?.type === 'logout' && (
        <ConfirmModal
          message="Are you sure you want to log out?"
          onConfirm={handleLogout}
          onCancel={() => setModal(null)}
          isDanger={false}
        />
      )}

      {modal?.type === 'delete' && (
        <ConfirmModal
          message="Are you sure you want to delete your account?"
          onConfirm={handleDelete}
          onCancel={() => setModal(null)}
          isDanger={true}
        />
      )}
    </div>
  );
}

export default Settings;