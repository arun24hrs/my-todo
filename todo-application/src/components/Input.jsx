import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import TodoItem from "./todoItem";

const Input = () => {
  const [task, setTask] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const notify = () => toast.success("Task added successfully.");

  const handleInput = (e) => {
    setTask({ ...task, taskName: e.target.value });
  };

  const handleDate = (e) => {
    setTask({ ...task, dueDate: e.target.value });
  };

  const handleAddTask = () => {
    if (
      (task.taskName == "" || undefined) || task.dueDate == ""
    ) {
      const notify1 = () => toast.warn("Please fill the task details.");
      notify1();
      return;
    }
    const newTask = {
      taskName: task.taskName,
      dueDate: task.dueDate,
      isPrior: false,
      isComplete: false,
      isPending: false,
    };

    addTask(newTask);
  };

  
  const addTask = async(task) => {
    console.log(task, "task");
    let token = localStorage.getItem("token")

    try {
      setLoading(true);
      let response = await axios.post(
        `https://todo-backend-2-2yjh.onrender.com/tasks/add`, task,
        {
          
          headers: {
            "Authorization": token,
          "Content-Type": "application/json"
          },
        }
      );
      console.log("Task Payload:", JSON.stringify(task));
      console.log(response);
      if (response.status==200) {
        notify();
        window.location.reload();
      } else {
        const notify1 = () => toast.warn("Somthing went wrong. Logging the task failed.");
      notify1();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="inputWrapper flex justify-center">
        <input
          type="text"
          placeholder="Enter Your Task"
          onChange={(e) => handleInput(e)}
          className="border border-gray-300 rounded-sm w-sm inputt"
        />
        <div className="flex flex-col">
          <input
            type="date"
            placeholder="Select Due Date"
            className="border border-gray-300 rounded-sm dateInput"
            onChange={(e) => handleDate(e)}
          />
          <label className="text-[10px] text-red-500">Select Due Date</label>
        </div>
        {loading ? (
          <button className="px-4 border border-amber-400 rounded-md btn bg-gray-500 text-white ">
            Add Task
          </button>
        ) : (
          <button
            onClick={handleAddTask}
            className="bg-[#fce180] px-4 border border-amber-400 rounded-md btn hover:bg-[#baa559] hover:text-white transform duration-500"
          >
            Add Task
          </button>
        )};
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
      <div>{/* <TodoItem data={task}/> */}</div>
    </>
  );
};

export default Input;
