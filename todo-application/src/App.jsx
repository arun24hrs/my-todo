import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router"
import Header from './components/Header'
import Home from './components/Home'
import Input from './components/Input'
import TodoList from './components/todoList'

function App() {
  const [loggedInUser, setLoggedInUser] = React.useState("");
console.log(loggedInUser,"loggedinuser")
  return (
    <>
    <Header user={loggedInUser.email}/>
      <Routes>
        <Route path='/' element={<Home setUserFn={setLoggedInUser}/>}/>
        <Route path='/todolist' element={<TodoList/>}/>
      </Routes>
    </>
  )
}

export default App
