import React, { useState, useEffect } from "react";
import axios from 'axios';
import DatePicker from "react-datepicker";
import { useParams, useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = () => {
    const { id } = useParams();  // Use useParams to get the id from the URL
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/' + id)
            .then(response => {
                setUsername(response.data.username);
                setDescription(response.data.description);
                setDuration(response.data.duration);
                setDate(new Date(response.data.date));
            })
            .catch(function (error) {
                console.log(error);
            });
        
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const onChangeDuration = (e) => {
        setDuration(e.target.value);
    };

    const onChangeDate = (date) => {
        setDate(date);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date,
        };

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/' + id, exercise)
            .then(res => console.log(res.data));

        navigate('/');
    };

    return (
        <div className="container">
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select 
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}>
                        {
                            users.map(function (user) {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>

                <div className="form-group">
                    <label>Duration (Mins): </label>
                    <input type="text"
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>

                <div className="form-group mb-3">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default EditExercise;
