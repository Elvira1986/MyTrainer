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
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const user = localStorage.getItem("user");
    if (user) {
        setUserData(JSON.parse(user));
    }
  }, []);

  // Geting User with specific id and passing this data to front end
  const getUser = async () => {
    // create fetch option for get user by id
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    console.log(id);
    try {
      const response = await fetch(`/api/auth/profile`, options);
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   getUser();
  // }, [id]);

  // DELETE the User
  async function deleteUser() {
    // Do the DELETE by creating fetch options
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      let response = await fetch(`/api/auth/profile`, options);
      if (response.ok) {
        let data = await response.json();
        // Send user to home page
        navigate(`/`);
        localStorage.removeItem("token");
        // set to log out
        //  Need to DOOOOO
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
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    };
    try {
      let response = await fetch(`/api/auth/profile`, options);
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

              <label>Update Goal </label>
              <select
                value={user.goal}
                onChange={handleInput}
                name="goal"
                type="text"
                className="form-control mb-2"
              >
                <option value="Loose Weight">Loose Weight</option>
                <option value="Get fit" selected>
                  Get fit
                </option>
                <option value="Increase strength">Increase strength</option>
                <option value="Gain weight">Gain weight</option>
              </select>

              <button className="update" type="submit">
                Update
              </button>
            </form>
          </div>
        ) : (
          <div className="Profile">
            <h1>Personal Info</h1>
            <p>Username: {userData.username}</p>
            <p>First Name: {userData.first_name}</p>
            <p>Last Name: {userData.last_name}</p>
            <p>
              <span>Height: {userData.height} cm</span>{" "}
            </p>
            <p>
              <span>Weght: {userData.weight} kg</span>
            </p>

            <p>Gender: {userData.gender}</p>
            <p>Goal: {userData.goal}</p>

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
