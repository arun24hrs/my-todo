import React, { useEffect, useState } from "react";
import Input from "./Input";
import { Table } from "antd";
import Header from "./Header";
import TodoItem from "./todoItem";

const TodoList = () => {
  const [allTask, setAllTask] = useState([]);
  const [filterOptions, setFilterOptions] = useState("All Tasks");
  const [currentView, setCurrentView] = useState([]);

  const token = localStorage.getItem("token") || "";

  const fetchAllTasks = async () => {
    try {
      const response = await fetch(`https://todo-backend-2-2yjh.onrender.com/tasks/all`, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      setAllTask(data); // Triggers filtering through useEffect
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  // Apply filter whenever allTask or filterOptions changes
  useEffect(() => {
    let filtered = [];

    switch (filterOptions) {
      case "All Tasks":
        filtered = allTask.filter((el)=> el.isComplete != true);
        break;
      case "Priority":
        filtered = allTask.filter((el) => {
      const dueDate = new Date(el.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // normalize to start of the day
      dueDate.setHours(0, 0, 0, 0);

      const twoDaysLater = new Date(today);
      twoDaysLater.setDate(today.getDate() + 2);

      return dueDate >= today && dueDate <= twoDaysLater;
    });
        break;
      case "Over Due":
        filtered = allTask.filter((el) => new Date(el.dueDate) < new Date() && !el.isComplete);
        break;
      case "Pending":
        filtered = allTask.filter((el) => el.isPending === true);
        break;
      case "Completed":
        filtered = allTask.filter((el) => el.isComplete === true);
        break;
      default:
        filtered = allTask;
        break;
    }

    setCurrentView(filtered);
  }, [filterOptions, allTask]);

  // Fetch on first render
  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <>
      <Header />
      <Input />
      <div className="flex justify-center gap-6 mt-8 w-full">
        {["All Tasks", "Priority", "Over Due", "Pending", "Completed"].map((label) => (
          <button
            key={label}
            className={`rounded px-4 py-1.5 border text-white transform duration-500 ${
              label === "All Tasks"
                ? "border-blue-500 bg-blue-500 hover:bg-blue-700"
                : label === "Priority"
                ? "border-orange-400 bg-orange-400 hover:bg-orange-500"
                : label === "Over Due"
                ? "border-red-500 bg-red-500 hover:bg-red-700"
                : label === "Pending"
                ? "border-teal-500 bg-teal-500 hover:bg-teal-700"
                : "border-green-500 bg-green-500 hover:bg-green-700"
            }`}
            onClick={() => setFilterOptions(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <table className="w-[95%] mt-4 border border-amber-700 text-center rounded-lg overflow-hidden shadow-md">
          <thead className="bg-amber-100 text-amber-900">
            <tr>
              <th className="py-2 px-4 border-b">Task</th>
              <th className="py-2 px-4 border-b">Due Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Action Buttons</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-400">
            {currentView.map((el) => (
              <tr key={el._id} className="bg-amber-50 odd:bg-amber-200 hover:bg-amber-300 transition duration-200">
                <TodoItem data={el} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TodoList;
