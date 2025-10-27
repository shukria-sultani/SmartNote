import { useState } from 'react'

import './App.css'
import HomePage from './components/HomePage.jsx'
import NotePage from './components/NotePage.jsx'
import NotFound from "./components/NotFound.jsx"
import {BrowserRouter as Router, Routes, Route, useParams} from "react-router-dom"
import NoteReadMode from './components/NoteReadMode.jsx'

function App() {
const noteId = useParams()
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
