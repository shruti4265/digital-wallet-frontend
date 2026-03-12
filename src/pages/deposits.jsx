import React, { useEffect, useState } from "react";
import { useNavigate, NavLink} from "react-router-dom";
import './dashboard.css';
import SideBar from "./dashboard-layout/sidebar";
import Header from "./dashboard-layout/header";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function Deposits() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [userData,setuserData] = useState("");
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    const checkAuthandFetch = async () => {
      const token = localStorage.getItem("token");
      const time=localStorage.getItem("Time");
      const currentTime=Date.now();
      const timeDiff=currentTime-time;
      console.log("Your Token:", token);
    
      if (!token||timeDiff>3600000) {
        // No token found? Redirect to login page immediately
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("Time");
        navigate("/Login");
      } else {
        // Token found! Let them see the dashboard
        const savedData=JSON.parse(localStorage.getItem("user"));
        setuserData(savedData);
        setAuthorized(true);
        try{
          const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/account/transactions", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
          const deposits = await response.json();
          const filteredDeposits = deposits.transactions.filter(
            (tx) => tx.transaction_type === "deposit"
          );
          setDeposits(filteredDeposits);
          console.log("Deposits:", filteredDeposits);
        } catch (error) {
          console.error("Error fetching deposits:", error);
        }
      }
    }
    checkAuthandFetch();
  }, [navigate]);

  // Don't show anything until we know they are logged in
  if (!authorized) return null; 

  return (
    //put your content here
    <div className="body">
      <div className="container">
        <SideBar/>
        <div className="content">
          <Header userData={userData}/>
          <div className="main-content-transfers">
            <div className="all-transfers">
              <h2 style={{ marginBottom: "10px", paddingLeft: "40px", paddingTop: "25px", fontWeight: "normal" }}>All Deposits</h2>
              <div className="transaction-header">
                  <p>Type</p>
                  <p>Amount</p>
                  <p>Date & Time</p>
              </div>
              <div className="all-transactions">
                  {deposits.map((tx) => {
                    return (
                      <div className="transaction-row" key={tx.id}>
                        <div className="type-icon"> <ArrowDownwardIcon className="deposit-icon" /><p>Deposit</p></div>
                        <p className="amount">₹{tx.amount}</p>
                        <p className="date">
                          {new Date(tx.timestamp).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </p>
                      </div>
                    );
                  })}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Deposits;