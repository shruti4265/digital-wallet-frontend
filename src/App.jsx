import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import Home from "./pages/home";
import Transfers from "./pages/transfers";
import Deposits from "./pages/deposits";
import Settings from "./pages/settings";
import AuthCallback from "./pages/AuthCallback";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/transfers" element={<Transfers/>}/>
      <Route path="/deposits" element={<Deposits/>}/>
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  )
}

export default App;
