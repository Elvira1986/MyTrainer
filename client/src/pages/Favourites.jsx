// Favourites.jsx

import { useState, useEffect } from "react";

function Favourites() {
    

    const [allFavFood, setAllFavFood] = useState(null)
    const [selectedFavFood, setSelectedFavFood] = useState(null)
    const [error, setError] = useState(null)


    const getAllFavFood = async () => {
        // to get fav food by id
        let options = {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
            },
        };

        try {
            // Make the GET request to fail. This try catch is used to check for errors
            let request = await fetch("/api/favfoods/food", options);
            if (request.ok) {
                // Server accepted my request; wait for data (sent as JSON)
                let response = await request.json();
                // Save it in state
                console.log(response);
                setAllFavFood(response);
            
            } else {
                setError(`Server error: ${request.status} ${request.statusText}`);
            }
        } catch (error) {
            console.log("Database query failed:", error.message)
            setError(`Network error: ${error.message}`);
        }
    };

    useEffect(() => {
        getAllFavFood(); // Fetch fav chicken recipes on initial load
    }, []);

    

    // async function handleBookDetails (book) {
        
    //     setSelectedBook(book)
        
    //     console.log("Clicked", book)
    // }

    // async function handleFavourite(e) {
    //     console.log("Clicked")
    // }

    return (
        <div id="Favourites">
            <h2>Favourites</h2>

            {allFavFood && <ul>
                {allFavFood.map((food) => (
                    <div key={food.external_api_id}>
                        <h3> {food.name} </h3>
                        <img src= {food.image} alt= {food.name} />
                    </div>
                ))}
            </ul> }

        </div>
    )

}
export default Favourites;
