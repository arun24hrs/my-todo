import React from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import TodoItem from './todoItem';

const Input = () => {

  const [task, setTask] = React.useState({});


  const handleInput = (e) => {
    console.log(e.target.value)
    setTask({...task,taskName: e.target.value});
  }

  const handleDate = (e)=> {
    setTask({...task, dueDate: e.target.value})
  }

  const handleAddTask = () => {
    if(task.taskName == "" || task.taskName == undefined || task.dueDate == ""){
      const notify = () => toast.warn("Please fill all the detials");
      notify();
    }
    const newTask = {
      taskName: task.taskName,
      dueDate: task.dueDate,
      isPrior: false,
      isComplete: false,
      isPending: false
    }
    console.log(task, "task")
  
    addTask(newTask);

  }
let token = localStorage.getItem("token");
console.log(token)
  const addTask = async(task) => {
     try {
       let response = await axios.post(`http://localhost:8080/tasks/add`, task, {headers: {
        "Authorization": token
       }});
      //  response = await response.json();
       console.log(response);
       
     } catch (error) {
      console.log(error)
     }
    }

  return (
    <>
    
    <div className='inputWrapper flex justify-center'>
        <input type='text' placeholder='Enter Your Task' onChange={(e)=>handleInput(e)} className='border border-gray-300 rounded-sm w-sm inputt'/>
        <div className='flex flex-col'>
        <input type='date' placeholder='Select Due Date' className='border border-gray-300 rounded-sm dateInput' onChange={(e)=> handleDate(e)}/>
        <label className='text-[10px] text-red-500'>Select Due Date</label>
        </div>
        <button onClick={handleAddTask} className='bg-[#fce180] px-4 border border-amber-400 rounded-md btn hover:bg-[#baa559] hover:text-white transform duration-500'>Add Task</button>
    </div>
    <div>
      {/* <TodoItem data={task}/> */}
    </div>
    </>
  )
  
}

export default Input