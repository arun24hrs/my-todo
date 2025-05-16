import React from 'react'
import TodoList from './todoList';

const Input = () => {

  const [task, setTask] = React.useState();
  const [newDueDate, setNewDueDate] = React.useState("");
  const [allTask, setAllTask] = React.useState([]);

  const handleInput = (e) => {
    
    setTask(e.target.value);
  }

  const handleDate = (e)=> {
    console.log(e.target.value);
    setNewDueDate(e.target.value);
  }

  const handleAddTask = () => {
    if(task == "" || task == undefined || newDueDate == ""){
      alert('Please fill all details.');
    }
    const newTask = {
      id: Date.now(),
      task: task,
      dueDate: newDueDate,
      isPrior: false
    }
    setAllTask([...allTask, newTask]);
  }

  console.log(allTask)
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
      <TodoList data={task}/>
    </div>
    </>
  )
  
}

export default Input