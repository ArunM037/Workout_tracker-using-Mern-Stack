import { useWorkoutContext } from "../hooks/useWorkoutContext";
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom'

const WorkoutDetails = ({ workouts }) => {
    const { dispatch } = useWorkoutContext();
    const { user } = useAuthContext();
    const Navigate = useNavigate();

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/workouts/' + workouts._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json });
        }
    };
    const handleEdit = () => {
        Navigate(`/components/UpdateWorkoutform/${workouts._id}`);
    }

    return (
        <div className="workout-details">
            <h4><strong>Workout name:</strong> {workouts.title}</h4>
            <p><strong>Load (kg):</strong> {workouts.load}</p>
            <p><strong>Reps:</strong> {workouts.reps}</p>
            <p>{formatDistanceToNow(new Date(workouts.createdAt), { addSuffix: true })}</p>
            <p>{formatDistanceToNow(new Date(workouts.updatedAt), { addSuffix: true })}</p>
            <div className="workout-actions">
                <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
                <span className="material-symbols-outlined " id="edit" onClick={handleEdit}>Edit</span>
            </div>
        </div>
    );
};

export default WorkoutDetails;
