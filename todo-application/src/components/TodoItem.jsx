import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { _ButtonColorTypes } from "antd/es/button";


const TodoItem = ({ data }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [task, setTask] = React.useState(data);

  const token = localStorage.getItem("token");
  
  const notify = () => toast.success("Task updated successfully.");

    const handleInput = (e) => {
      setTask({ ...task, taskName: e.target.value });
    };

    const handleDate = (e) => {
    setTask({ ...task, dueDate: e.target.value });
  };

  const handleUpdate = async() => {
    handleAddTask();
    try {
      console.log(task, "updated data")
      let response = await fetch(`https://todo-backend-2-2yjh.onrender.com/tasks/edit/${data._id}`,{
        method: "PATCH",
        body: JSON.stringify(task),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        }
      })
      response = await response.json();
      console.log(response);
      notify();
    } catch (error) {
      console.log(error.message, "msg");
    } finally{
      setIsEdit(false);
    }
  }

  const handleAddTask = () => {
    if (
      (task.taskName == "" || undefined) || task.dueDate == ""
    ) {
      const notify1 = () => toast.warn("Please fill the task details.");
      notify1();
      return;
    }
  };


  const handleComplete = async () => {
    try {
      const response = await fetch(`https://todo-backend-2-2yjh.onrender.com/tasks/edit/${data._id}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, isComplete: true, isPending: false }),
      });
      const resData = await response.json();
      console.log("Completed:", resData);
      // onUpdate?.(); // Optional: Refresh list
    } catch (error) {
      console.log("Error completing task:", error);
    }
  };

  const handlePending = async () => {
    try {
      const response = await fetch(`https://todo-backend-2-2yjh.onrender.com/tasks/edit/${data._id}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, isPending: true }),
      });
      const resData = await response.json();
      console.log("Marked Pending:", resData);
      // onUpdate?.();
    } catch (error) {
      console.log("Error marking pending:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://todo-backend-2-2yjh.onrender.com/tasks/delete/${data._id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
      const resData = await response.json();
      console.log("Deleted:", resData);
      // onUpdate?.();
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const handleEdit = () => {
    // Trigger edit flow - can open modal or redirect
    setIsEdit(true);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // eg. 5/25/2025
  };

  return (
    <>
      {isEdit ? <td>
        <input
          type="text"
          placeholder="Enter Your Task"
          value={task.taskName}
          onChange={(e) => handleInput(e)}
          className="border border-gray-300 rounded-sm w-sm inputt"
        />
      </td> :<td className="py-2 px-4 text-amber-900 font-medium inline">{task.taskName}</td>}
      {isEdit ? <td><input
            type="date"
            placeholder="Select Due Date"
            value={task.dueDate}
            className="border border-gray-300 rounded-sm dateInput inline"
            onChange={(e) => handleDate(e)}
          /></td> : <td className="py-2 px-4 text-amber-800">{formatDate(data.dueDate)}</td>}
      <td
        className={`py-2 px-4 font-semibold ${
          data.isComplete ? "text-green-700" : "text-red-600"
        }`}
      >
        {data.isComplete ? "Completed" : "Incomplete"}
      </td>
      <td className="py-2 px-4 flex justify-center gap-2">
        {isEdit ? <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-800 transition duration-200"
          onClick={handleUpdate}
        >
          👍Update
        </button>:<button
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-800 transition duration-200"
          onClick={handleEdit}
        >
          ✏️ Edit
        </button>}
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
          onClick={handleDelete}
        >
          🗑️ Delete
        </button>
        <button
          className="bg-teal-500 text-white px-3 py-1 rounded-md hover:bg-teal-700 transition duration-200"
          onClick={handlePending}
        >
          🕰️ Pending
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-200"
          onClick={handleComplete}
        >
          ✅
        </button>
      </td>
    </>
  );
};

export default TodoItem;
