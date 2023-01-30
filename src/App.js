import React from "react";
import Main from './Main'
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <Main/> } />
      </Routes>
    </>
  );
}

export default App;