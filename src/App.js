import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'boostrap/dist/css/boostrap.min.css'

import Navbar from "./component/navbar.component";
import ExerciseList from "./component/exercise-list.component";
import EditExercise from "./component/edit-exercise.component";
import CreateExercise from "./component/create-exercise.component";
import CreateUser from "./component/cretae-user.component";

function App() {
  return (
    <Router>
      <Navbar/>
      <br/>

      <Route path='/' exact component={ExerciseList} />
      <Route path='/edit/:id' component={EditExercise} />
      <Route path='/create' component={CreateExercise} />
      <Route path='/user' component={CreateUser} />
    </Router>
  );
}

export default App;
