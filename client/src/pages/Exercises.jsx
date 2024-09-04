// Exercises.jsx
import { useEffect, useState } from 'react';

const Exercises = () => {
    // State to hold exercises and favorites
    const [exercises, setExercises] = useState([]);
    const [favorites, setFavorites] = useState(new Set());

    // Fetch exercises from the API
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/exercises/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data); // Log the fetched data for debugging
                setExercises(data); // Set the fetched exercises
            } catch (error) {
                console.error('Failed to fetch exercises:', error);
            }
        };

        fetchExercises(); // Call the fetch function
    }, []);

    // Handle adding and removing from favorites
    const toggleFavorite = async (exerciseId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(exerciseId)) {
            // Remove from favorites in the backend
            await fetch(`http://localhost:4000/api/favexercises/${exerciseId}`, { method: 'DELETE' });
            newFavorites.delete(exerciseId); // Remove from local state
        } else {
            // Add to favorites in the backend
            await fetch('http://localhost:4000/api/favexercises/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exerciseId }), // Send exerciseId in body
            });
            newFavorites.add(exerciseId); // Add to local state
        }
        setFavorites(newFavorites); // Update state
    };

    // Render the exercise cards
    return (
        <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {exercises.length === 0 ? (
                <p>No exercises found.</p>
            ) : (
                exercises.map(exercise => (
                    <div key={exercise.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                        <img src={exercise.image} alt={exercise.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                        <h3>{exercise.name}</h3>
                        <p>{exercise.description}</p>
                        <button
                            onClick={() => toggleFavorite(exercise.id)}
                            style={{ backgroundColor: favorites.has(exercise.id) ? 'red' : 'blue', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                            {favorites.has(exercise.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Exercises;
