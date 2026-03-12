import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Header({ userData }) {
  return (
    <div className="userName">
      <h3>Welcome back, {userData.username}!</h3>
      <AccountCircleIcon
        sx={{ fontSize: "2.7rem", color: "rgb(0, 80, 80)" }}
      />
    </div>
  );
}
export default Header;