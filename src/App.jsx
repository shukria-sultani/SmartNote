import { useState } from 'react'
import Header from "./Components/Header"
import Hero from "./Components/Hero"
import Footer from "./Components/Footer"
import './App.css'
import HomePage from './Components/HomePage'
import NotePage from './Components/NotePage'
import NotFound from "./Components/NotFound"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AddNote from './Components/AddNote'
function App() {

  return (
   <div>
   
    <Router>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>} />
          <Route  path='/notes' element={<NotePage></NotePage>} />
          <Route  path='*'  element={<NotFound></NotFound>} />
        </Routes>

    </Router>

   </div>
  )
}

export default App
