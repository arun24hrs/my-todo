import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Home from './components/Home'
import TodoList from './components/TodoList'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const [loggedInUser, setLoggedInUser] = React.useState("");

  return (

      <>
      <Header user={loggedInUser?.email} />
      <Routes>
        <Route path='/' element={<Home setUserFn={setLoggedInUser} />} />
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
