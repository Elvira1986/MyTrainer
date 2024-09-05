import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Profile.css";

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
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Geting User with specific id and passing this data to front end
  const getUser = async () => {
    try {
      const response = await fetch(`/api/users/:{id}`);
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
      let response = await fetch(`/api/users/:{id}`, options);
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

  // EDIT User's WEIGHT and GOAL where we edit the change and send data back to server
  // May be is Modal? will be cool
  async function editUser() {
    let body = { ...user };
    // Do the PATCH by creating fetch options
    let options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    try {
      let response = await fetch(`/api/users/:{id}`, options);
      if (response.ok) {
        let data = await response.json();
        setUser(data);
        navigate(`/favourites`);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  // Calling the form to send new user updates to the Database and calling PATCH/editUser function
  function handleUpdate(e) {
    e.preventDefault();
    editUser();
  }

  // Switching to modal with inputs when you click Edit button in User
  function editMode() {
    setIsEdit(!isEdit);
  }

  // Changing data in Input
  function handleInput(e) {
    // targeting object inputs with event target
    const { name, value } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);
    // Setting new values and update it
    setUser((userBefore) => ({ ...userBefore, [name]: value }));
  }

  return (
    <>
      <div>
        {isEdit ? (
          <div className="UpdateProfile">
            <h1>Update My Profile</h1>
            <form onSubmit={handleUpdate}>
              <label>
                Update weight:
                <input
                  className="profileInput"
                  type="number"
                  name="weight"
                  onChange={handleInput}
                  value={user.weight}
                />
              </label>
              <label>
                Update Goal:
                <input
                  className="profileInput"
                  type="text"
                  name="goal"
                  onChange={handleInput}
                  value={user.goal}
                />
              </label>
              <button type="submit">Update</button>
            </form>
          </div>
        ) : (
          <div className="Profile">
            <h1>Personal Info</h1>
            <p>Username: {user.username}</p>
            <p>First Name: {user.first_name}</p>
            <p>Last Name: {user.last_name}</p>
            <p>
              <span>Height: {user.height} cm</span>{" "}
            </p>
            <p>
              <span>Weght: {user.weight} kg</span>
            </p>

            <p>Gender: {user.gender}</p>
            <p>Goal: {user.goal}</p>

            <div className="Buttons">
              <button onClick={editMode}>Update</button>
              <button onClick={deleteUser} title="Delete User">
                Delete Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
