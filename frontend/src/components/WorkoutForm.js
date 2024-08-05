import { useState } from "react";
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext()
    const [title, settitle] = useState('')
    const [load, setload] = useState('')
    const [reps, setreps] = useState('')
    const [Error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext();

    const handleSumbit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const workout = { title, load, reps }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            settitle('')
            setload('')
            setreps('')
            setError(null)
            setEmptyFields([])
            console.log('new Workout added', json)
            dispatch({ type: 'CREATE_WORKOUTS', payload: json })
        }
    }


    return (
        <form action="" className="create" onSubmit={handleSumbit}>
            <h3>Add a New Workout</h3>
            <label>Excercise Title:</label>
            <input type="text" onChange={(e) => settitle(e.target.value)} value={title} className={emptyFields.includes('title') ? 'error' : ''} />
            <label>Load (in kg):</label>
            <input type="number" onChange={(e) => setload(e.target.value)} value={load} className={emptyFields.includes('load') ? 'error' : ''} />
            <label>reps:</label>
            <input type="number" onChange={(e) => setreps(e.target.value)} value={reps} className={emptyFields.includes('reps') ? 'error' : ''} />
            <button>Add Workout</button>
            {Error && <div className="error">{Error}</div>}
        </form>
    );
}

export default WorkoutForm;