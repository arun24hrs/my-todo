import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home'
import PrivateRoute from './components/PrivateRoute'
import TodoList from './components/todoList'


function App() {

  // const isUser = localStorage.getItem("token");

  return (

      <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todolist' element={
          <PrivateRoute>
            <TodoList />
          </PrivateRoute>
        } />
      </Routes>
      </>

  );
}

export default App;
