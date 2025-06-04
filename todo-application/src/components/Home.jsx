import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Header from "./Header";

const Home = () => {

      const [isLoading, setIsLoading] = React.useState(false);


    return (
        <>
        <Header />
        <div className="flex justify-center items-center h-[80vh] bg-amber-100">
        <div className="flex flex-row gap-12 items-center">
            <Signup setIsLoading={setIsLoading} isLoading={isLoading}/>
            <div className="border border-gray-400 h-60"></div>
            <Login setIsLoading={setIsLoading}/>
        </div>
        </div>
        </>
    )
};

export default Home;