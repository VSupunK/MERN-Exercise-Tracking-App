import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'

// Functional component to display an exercise row
const Exercise = props => {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={"/edit/" + props.exercise._id}>edit</Link> | 
                <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}> Delete </a>
            </td>
        </tr>
    );
}

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { exercises: [] };
    }

    // Fetch exercises when the component mounts
    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Delete exercise by id
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        });
    }

    // Render the list of exercises
    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        });
    }

    render() {
        return (
            <div className="container ">
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        );
    }
}
