import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ username }) => {
  const navigate = useNavigate();
  // console.log(username, "username");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  }
  return (
    <div>
      <div className="absolute top-2 right-6 flex gap-2">
        <h3>Hi {username.split("@")[0]}</h3>
        <button className="bg-red-600 text-white rounded-lg logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
