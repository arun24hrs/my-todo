import React from "react";
import TodoList from "./todoList";
import {useNavigate} from "react-router-dom";

const Login = ({setUserFn}) => {


    const [user, setUser] = React.useState({email: "", password: ""});
    // const [login, setLogin] = React.useState(false)

    const navigate = useNavigate();
    
    
    const handleChange = (e) => {
        const {name,value} = e.target;
        setUser({...user, [name]: value});
    }

    const handleLogin = async() => {
        try {
            let response = await fetch('http://localhost:8080/users',{
            method: "get",
            headers:{
               "Content-Type": "application/json" 
            }
            
        });
        response = await response.json();
        let loggedInUser = response.filter((el)=>el.email == user.email && el.password == user.password);
        if(loggedInUser.length < 1){
            alert("Login Failed!");
        } else {
            alert('You are logged in');
            setUserFn(user);
            navigate("/todolist", { state: { user } });
        }
        
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex flex-col w-sm gap-4">
                <h2 className="text-lg font-semibold">Login to your account</h2>
                 <input type='text' placeholder='Enter Your Email' name="email" onChange={(e)=>handleChange(e)} className='border border-gray-300 rounded-sm w-sm inputt'/>
                
                 <input type='text' placeholder='Enter Your Password' name="password" onChange={(e)=>handleChange(e)} className='border border-gray-300 rounded-sm w-sm inputt'/>

                 <button className='bg-[#fce180] px-4 border border-amber-400 rounded-md btn hover:bg-[#baa559] hover:text-white transform duration-500 mt-2' onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login;