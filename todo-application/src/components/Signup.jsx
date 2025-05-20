import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./Loading";

const Signup = () => {
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [isEmailError, setEmailError] = React.useState(false);
  const [isPasswordError, setPasswordError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const notify = () =>
    toast.success("Account created successfully. Please login to continue.");
  const notify1 = () => toast.warn("User already registered!");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailError(false);
    setPasswordError(false);
    setUser({ ...user, [name]: value });
  };

  const handleCreateAccount = async () => {
    if (user.email) {
      if (!user.email.includes("@")) {
        setEmailError(true);
        // user.email.target.className = "inputError border {border-red-500} rounded-sm w-sm inputt"
      } else {
        // user.email.target.className = 'border {border-gray-300} rounded-sm w-sm inputt';
        setEmailError(false);
      }
    } else {
      if (user.email == "") {
        // alert("Fill complete form!")
        setEmailError(true);
      }
      if (user.password == "") {
        setPasswordError(true);
      }

      if (!/[!@#$%^&*+-=_]/.test(user.password) || user.password.length < 8) {
        setPasswordError(true);
      }
    }

    try {
      setLoading(true);
      let response = await fetch(
        "https://todo-backend-1-a11u.onrender.com/users/register",
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      let result = await response.json();
      // console.log(result, "response");

      result.message == "User already registered!" ? notify1() : notify();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col w-sm gap-4">
        <h2 className="text-lg font-semibold">Create new account</h2>
        <div>
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
            className="border border-gray-300 rounded-sm w-sm inputt"
          />
          {isEmailError ? (
            <span className="text-red-600 text-xs">
              {user.email == ""
                ? "Please enter email ID."
                : "Please enter a valid email ID."}
            </span>
          ) : null}
        </div>

        <div>
          {" "}
          <input
            type="password"
            placeholder="Create Your Password"
            name="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
            className="border {border-gray-300} rounded-sm w-sm inputt"
          />
          {isPasswordError ? (
            <span className="text-red-600 text-xs">
              {user.password == ""
                ? "Please enter password"
                : "Please enter 8 character password containing special characters."}
            </span>
          ) : null}
        </div>

        <button 
          className="bg-[#fce180] px-4 border border-amber-400 rounded-md btn hover:bg-[#baa559] hover:text-white transform duration-500 mt-2"
          onClick={handleCreateAccount}
        >
          {loading ? "Creating your account..." : "Create Account"}
        </button>
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

export default Signup;
