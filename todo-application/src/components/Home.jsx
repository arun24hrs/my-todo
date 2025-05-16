import React from "react";
import Login from "./Login";
import Signup from "./Signup";

const Home = ({setUserFn}) => {


    return (
        <div className="flex justify-center items-center h-[80vh] bg-amber-100">
        <div className="flex flex-row gap-12 items-center">
            <Signup/>
            <div className="border border-gray-400 h-60"></div>
            <Login setUserFn={setUserFn}/>
        </div>
        </div>
    )
};

export default Home;