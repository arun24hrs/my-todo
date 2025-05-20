import React from "react";
import Input from "./Input";
import TodoItem from "./todoItem";
// import { useLocation } from "react-router-dom";

const TodoList = (data) => {
    const [newDueDate, setNewDueDate] = React.useState("");
    const [allTask, setAllTask] = React.useState([]);
  console.log(data);
  // const {state} = useLocation();

  return (
    <>
      <Input />
      <TodoItem setAllTask={setAllTask} setNewDueDate={setNewDueDate} data={allTask}/>
    </>
  );
};

export default TodoList;
