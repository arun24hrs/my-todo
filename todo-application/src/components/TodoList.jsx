import React from "react";
import Input from "./Input";
import { useLocation } from "react-router-dom";

const TodoList = (data) => {

    console.log(data);
    const {state} = useLocation();


    return (
        <>{"todoList"}</>
    )

}

export default TodoList;