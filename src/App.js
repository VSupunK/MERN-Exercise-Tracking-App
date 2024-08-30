import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercise-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <div className='bg-secondary  min-vh-100'>

    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route path='/' element={<ExercisesList />} />
        <Route path='/edit/:id' element={<EditExercise />} />
        <Route path='/create' element={<CreateExercise />} />
        <Route path='/user' element={<CreateUser />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
