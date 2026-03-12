import React  from "react";
import { NavLink} from "react-router-dom";
import '../dashboard.css'
import HomeIcon from '@mui/icons-material/Home';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
const menuItems = [
  { path: "/", label: "Home", icon: <HomeIcon sx={{ fontSize: '2.5rem' }} className="icon"/> },
  { path: "/transfers", label: "Transfers", icon: <SwapHorizIcon sx={{ fontSize: '2.5rem' }} className="icon"/> },
  { path: "/deposits", label: "Deposits", icon: <AccountBalanceWalletIcon sx={{ fontSize: '2.5rem' }} className="icon"/> },
  { path: "/settings", label: "Settings", icon: <SettingsIcon sx={{ fontSize: '2.5rem' }} className="icon"/> },
];
function SideBar(){
    return(
        <div className="SideBar">
          {menuItems.map((item)=>(
            <NavLink key={item.path} 
              to={item.path}
              className={({isActive})=> isActive?" active":"nav-item"}>{item.icon}{item.label}
            </NavLink>
          ))}
        </div>
    );
};
export default SideBar;