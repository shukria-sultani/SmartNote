import { useState } from "react";

import "./App.css";
import MainLayout from "./layouts/MainLayout.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "./hooks/useTranslationContext.jsx";
import { lazy, Suspense } from "react";
import Loader from "./Components/Loader.jsx";
import Login from "./Components/auth/Login.jsx";

const NotePage = lazy(() => import("./Components/NotePage.jsx"));
const NotFound = lazy(() => import("./Components/NotFound.jsx"));
const NoteReadMode = lazy(() => import("./Components/NoteReadMode.jsx"));


function App() {
  return (
    <TranslationProvider>
      <div>
        <Router>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* 
   
              <Route path="/read/:noteId" element={<NoteReadMode />} />
              <Route path="/notes" element={<NotePage />} /> */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<NotePage />} />
                <Route path="/read/:noteId" element={<NoteReadMode />} />
                <Route path="/notes" element={<NotePage />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </TranslationProvider>
  );
}

export default App;
