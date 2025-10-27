import { useState } from 'react'

import './App.css'
import HomePage from './components/HomePage'
import NotePage from './components/NotePage'
import NotFound from "./components/NotFound"
import NoteReadMode from "./components/NoteReadMode"

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {s
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
