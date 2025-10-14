import { useState } from 'react'

import './App.css'
import HomePage from './components/HomePage'
import NotePage from './components/NotePage'
import NotFound from "./components/NotFound"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

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
