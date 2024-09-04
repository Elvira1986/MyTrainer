import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Profile() {
  // Initilizing the state of user
  const userInitialState = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    height: "",
    weight: "",
    gender: "",
    goal: "",
  };

  // Creating the state for user
  const [user, setUser] = useState(userInitialState);
  // Creating the state for Update & assigning to false
  //   const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Geting User with specific id and passing this data to front end
  const getUser = async () => {
    try {
      const response = await fetch(`/api/users/2`);
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  // DELETE the User
  async function deleteUser() {
    // Do the DELETE by creating fetch options
    let options = {
      method: "DELETE",
    };
    try {
      let response = await fetch(`/api/users/3`, options);
      if (response.ok) {
        let data = await response.json();
        // Send user to home page
        navigate(`/`);
        // set to log out
        //  Need to DOOOOO
        // delete user with specific id and sent to database
        setUser(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  return (
    <>
      <div>
        <h1>My Profile</h1>
        <p>{user.username}</p>
        <p>{user.first_name}</p>
        <p>{user.last_name}</p>
        <p>
          <span>{user.height} cm</span> <span>{user.weight} kg</span>
        </p>
        <p>{user.gender}</p>
        <p>{user.goal}</p>
      </div>
      <div className="Buttons">
        <button>Update</button>
        <button onClick={deleteUser} title="Delete User">
          Delete Profile
        </button>
      </div>
    </>
  );
}

export default Profile;
