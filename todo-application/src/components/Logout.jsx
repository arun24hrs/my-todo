import React from "react";

const Logout = ({ username }) => {
  console.log(username, "username");
  return (
    <div>
      <div className="absolute top-2 right-6 flex gap-2">
        <h3>Hi {username.split("@")[0]}</h3>
        <button className="bg-red-600 text-white rounded-lg logoutBtn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
