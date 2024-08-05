import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const UpdateWorkoutForm = () => {
    const { user } = useAuthContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch(`/api/workouts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                setTitle(json.title);
                setLoad(json.load);
                setReps(json.reps);
            } else {
                setError(json.error);
            }
        };

        if (user) {
            fetchWorkout();
        }
    }, [id, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };

        const response = await fetch(`/api/workouts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            setError(null);
            console.log('updated workout', json);
            navigate('/');
        }
    };

    return (
        <form className="update" onSubmit={handleSubmit}>
            <h3>Update Workout</h3>

            <label>Workout Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />
            <button>Update Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default UpdateWorkoutForm;
