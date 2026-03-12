import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './dashboard.css';
import SideBar from "./dashboard-layout/sidebar";
import Header from "./dashboard-layout/header";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PinCheck from "./dashboard-layout/pin_check";
import AmountInput from "./dashboard-layout/AmountInput";
import EmailInput from "./dashboard-layout/EmailInput";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import NorthEastIcon from '@mui/icons-material/NorthEast';

function Home() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [userData, setuserData] = useState(null);
  const [visibility, setvisibility] = useState(false);
  const [showPinPopup, setShowPinPopup] = useState(false);
  const [pin, setPin] = useState("");
  const [balance, setbalance] = useState(null);
  const [ShowAmountPopup, setShowAmountPopup] = useState(false);
  const [TransferAmountPopup, setTransferAmountPopup] = useState(false);
  const [TransferPinPopup, setTransferPinPopup] = useState(false);
  const [amount, setamount] = useState("");
  const [AmountPinPopup, setAmountPinPopup] = useState(false);
  const [TransferEmailPopup, setTransferEmailPopup] = useState(false);
  const [email, setemail] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
  const checkAuthAndFetch = async () => {

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

      try {
        const response = await fetch(
          import.meta.env.VITE_API_BASE_URL + "/account/transactions",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );

        const data = await response.json();

        if (response.ok) {
          const transactions = data.transactions.slice(0,3);
          setTransactions(transactions);
        } else {
          console.error("Error fetching transactions:", data.message);
        }

      } catch (err) {
        console.error("Network error:", err);
      }
    }
  };

  checkAuthAndFetch();

}, [navigate]);

  if (!authorized) return null;

  async function onVerify() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/account/balance", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ pin })
      });
      const data = await response.json();
      if (response.ok) {
        setbalance(data.balance);
        setvisibility(true);
        setShowPinPopup(false);
      } else {
        alert(data.message || "Invalid PIN");
      }
      setPin("");
    } catch (error) {
      console.error("Error verifying PIN:", error);
      alert("Error verifying PIN");
    }
  }

  async function onDeposit() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/account/deposit", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount, pin })
      });

      const data = await response.json();

      if (response.ok) {
        setAmountPinPopup(false);
        alert("Amount deposited successfully!");
      } else {
        alert(data.message);
      }

      setPin("");
      setamount("");
    } catch (error) {
      console.log("Error depositing amount:", error);
      alert("Error depositing amount");
      setPin("");
      setamount("");
      setAmountPinPopup(false);
    }
  }

  async function onTransfer() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/account/transfer", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ receiver_email: email, amount, pin })
      });

      const data = await response.json();

      if (response.ok) {
        setTransferPinPopup(false);
        alert("Amount transferred successfully!");
      } else {
        alert(data.message);
      }

      setPin("");
      setamount("");
      setemail("");
    } catch (error) {
      console.log("Error transferring amount:", error);
      alert("Error transferring amount");
      setPin("");
      setamount("");
      setemail("");
      setTransferPinPopup(false);
    }
  }

  return (
    <div className="body">
      <div className="container">

        {showPinPopup && (
          <PinCheck pin={pin} setPin={setPin} onVerify={onVerify} setPopup={setShowPinPopup} />
        )}

        {ShowAmountPopup && (
          <AmountInput amount={amount} setamount={setamount} setAmountPinPopup={setAmountPinPopup} setShowAmountPopup={setShowAmountPopup} />
        )}

        {AmountPinPopup && (
          <PinCheck pin={pin} setPin={setPin} onVerify={onDeposit} setPopup={setAmountPinPopup} />
        )}

        {TransferAmountPopup && (
          <AmountInput amount={amount} setamount={setamount} setAmountPinPopup={setTransferEmailPopup} setShowAmountPopup={setTransferAmountPopup} />
        )}

        {TransferEmailPopup && (
          <EmailInput email={email} setemail={setemail} setPinPopup={setTransferPinPopup} setEmailPopup={setTransferEmailPopup} />
        )}

        {TransferPinPopup && (
          <PinCheck pin={pin} setPin={setPin} onVerify={onTransfer} setPopup={setTransferPinPopup} />
        )}

        <SideBar />

        <div className="content">
          <Header userData={userData} />

          <div className="main-content">

            <div className="Balance">
              <div className="Balance-box">

                <h1 className="balance-text">Available Balance</h1>

                <div className="balance-row">
                  <h1 className="balance">
                    {visibility ? `₹ ${balance}` : "₹ ********"}
                  </h1>

                  {visibility
                    ? <VisibilityOffIcon style={{ cursor: "pointer" }} onClick={() => setvisibility(false)} />
                    : <VisibilityIcon style={{ cursor: "pointer" }} onClick={() => setShowPinPopup(true)} />
                  }
                </div>

              </div>
            </div>

            <div className="options">
              <div className="options-div">
                <button className="options-button" onClick={() => setTransferAmountPopup(true)}>
                  Send Money
                </button>
              </div>

              <div className="options-div">
                <button className="options-button" onClick={() => setShowAmountPopup(true)}>
                  Deposit Funds (Demo)
                </button>
              </div>
            </div>

            <div className="transfers">
              <div className="recent-three">
                <div><h2 style={{ marginBottom: "10px", paddingLeft: "40px", paddingTop: "25px", fontWeight: "normal" }}>Recent Transactions</h2></div>
                <div className="transaction-header">
                  <p>Type</p>
                  <p>Amount</p>
                  <p>Date & Time</p>
                </div>
                <div className="all-transactions">
                  {transactions.map((tx) => {
                    let icon;
                    let type;
                    if (tx.transaction_type === "deposit") {
                      icon = <ArrowDownwardIcon className="deposit-icon" />;
                      type = <p>Deposit</p>;
                    } else if (tx.sender_id === userData?.id) {
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
    </div>
  );
}

export default Home;