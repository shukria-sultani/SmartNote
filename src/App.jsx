import { useState } from 'react'

import './App.css'
import HomePage from './Components/HomePage.jsx'
import NotePage from './Components/NotePage.jsx'
import NotFound from "./Components/NotFound.jsx"
import NoteReadMode from "./Components/NoteReadMode.jsx"

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
   <div>
   
    <Router>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>} />
          <Route  path='/notes' element={<NotePage></NotePage>} />
          <Route  path='*'  element={<NotFound></NotFound>} />
          <Route  path='/read/:noteId'  element={<NoteReadMode></NoteReadMode>} />
        </Routes>

    </Router>

   </div>
  )
}

export default App
