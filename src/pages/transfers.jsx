import React, { useEffect, useState } from "react";
import { useNavigate, NavLink} from "react-router-dom";
import './dashboard.css';
import SideBar from "./dashboard-layout/sidebar";
import Header from "./dashboard-layout/header";
import SouthWestIcon from '@mui/icons-material/SouthWest';
import NorthEastIcon from '@mui/icons-material/NorthEast';


function Transfers() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [userData,setuserData] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const checkAuthandFetch = async () => {
      const token = localStorage.getItem("token");
      const time=localStorage.getItem("Time");
      const currentTime=Date.now();
      const timeDiff=currentTime-time;
      console.log("Your Token:", token);
    
      if (!token||timeDiff>3600000) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("Time");
        navigate("/Login");
      } else {
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
          const transactions = await response.json();
          const filteredTransactions = transactions.transactions.filter(
            (tx) => tx.transaction_type !== "deposit"
          );
          setTransactions(filteredTransactions);
          console.log("Transactions:", filteredTransactions);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      }
    };
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
              <h2 style={{ marginBottom: "10px", paddingLeft: "40px", paddingTop: "25px", fontWeight: "normal" }}>All Transfers</h2>
              <div className="transaction-header">
                  <p>Type</p>
                  <p>Amount</p>
                  <p>Date & Time</p>
              </div>
              <div className="all-transactions">
                  {transactions.map((tx) => {
                    let icon;
                    let type;
                    if (tx.sender_id === userData?.id) {
                      icon = <NorthEastIcon className="sent-icon" />;
                      type = <p>Sent</p>;
                    } else {
                      icon = <SouthWestIcon className="received-icon" />;
                      type = <p>Received</p>;
                    }
                    return (
                      <div className="transaction-row" key={tx.id}>
                        <div className="type-icon">{icon}{type}</div>
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
export default Transfers;