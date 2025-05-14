import React from 'react'

const Input = () => {
  return (
    <div className='inputWrapper flex justify-center'>
        <input type='text' placeholder='Enter Your Task' className='border border-gray-300 rounded-sm w-sm inputt'/>
        <button className='bg-[#fce180] px-4 border border-amber-400 rounded-md btn hover:bg-[#baa559] hover:text-white transform duration-500'>Add Task</button>
    </div>
  )
}

export default Input