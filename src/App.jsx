import { useState } from "react";

import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "./hooks/useTranslationContext.jsx";
import { lazy, Suspense } from "react";
// import HomePage from "./Components/HomePage.jsx"
const HomePage = lazy(() => import("./Components/HomePage.jsx"));
const NotePage = lazy(() => import("./Components/NotePage.jsx"));
const NotFound = lazy(() => import("./Components/NotFound.jsx"));
const NoteReadMode = lazy(() => import("./Components/NoteReadMode.jsx"));
const About = lazy(() => import("./Components/About.jsx"));

function App() {
  return (
    <TranslationProvider>
      <div>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/read/:noteId" element={<NoteReadMode />} />
              <Route path="/about" element={<About />} />
              <Route path="/notes" element={<NotePage />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </TranslationProvider>
  );
}

export default App;
