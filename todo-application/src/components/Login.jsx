import React from "react";
import TodoList from "./todoList";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false)
  const notify = () => toast.warn("Please login to your account!");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  const handleLogin = async () => {
      setLoading(true);

    try {
      let response = await fetch("https://todo-backend-1-a11u.onrender.com/users/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      response = await response.json();
      console.log(response);
      if (response.token) {
        localStorage.setItem("token",response.token);
        localStorage.setItem("username",user.email);
        navigate("/todolist");
        console.log("logged in");
        
      } else {
        notify();
      }
    } catch (error) {
          notify();
      console.log(error);
    }
    setLoading(false);
  };

  

  return (
    <div>
      <div className="flex flex-col w-sm gap-4">
        <h2 className="text-lg font-semibold">Login to your account</h2>
        <input
          type="text"
          placeholder="Enter Your Email"
          name="email"
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 rounded-sm w-sm inputt"
        />

        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 rounded-sm w-sm inputt"
        />

        {loading ? <button
          className="bg-gray-500 px-4 border border-amber-400 rounded-md btn hover:bg-[#baa559] hover:text-white transform duration-500 mt-2 text-white"
        >
          Getting things ready...
        </button> : <button
          className="bg-[#fce180] px-4 border border-amber-400 rounded-md btn hover:bg-[#baa559] hover:text-white transform duration-500 mt-2"
          onClick={handleLogin}
        >
          Login
        </button>}
        <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
      </div>
    </div>
  );
};

export default Login;
