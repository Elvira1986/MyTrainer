const api = {
  // GET ROUTE

  getFood: async function (
    cb = () => {},
    err = () => {}
  ) {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization:
          "Bearer " +
          localStorage.getItem("token"),
      },
    };

    try {
      // Make the GET request to fail. This try catch is used to check for errors
      let request = await fetch(
        "/api/favfoods/food",
        options
      );
      if (request.ok) {
        // Server accepted my request; wait for data (sent as JSON)
        const response = await request.json();
        cb(response);
      } else {
        err(
          `Server error: ${request.status} ${request.statusText}`
        );
      }
    } catch (error) {
      err(
        `Database query failed: ${error.message}`
      );
    }
  },

  // POST ROUTE

  postFood: async function (
    recipe,
    cb = () => {},
    err = () => {}
  ) {
    let options = {
      method: "POST",
      headers: {
        authorization:
          "Bearer " +
          localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        external_api_id: recipe.recipe.uri,
        name: recipe.recipe.label,
        image: recipe.recipe.image,
      }),
    };
    try {
      const request = await fetch(
        "/api/favfoods/food",
        options
      );
      if (request.ok) {
        // Server accepted my request; wait for data (sent as JSON)
        const response = await request.json();
        cb(response);
      } else {
        err(
          `Server error: ${request.status} ${request.statusText}`
        );
      }
    } catch (error) {
      err(`Network error: ${error.message}`);
    }
  },

  // DELETE ROUTE

  deleteFood: async function (
    id,
    cb = () => {},
    err = () => {}
  ) {
    let options = {
      method: "DELETE",
      headers: {
        authorization:
          "Bearer " +
          localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        external_api_id: id,
      }),
    };
    try {
      const request = await fetch(
        "/api/favfoods/food",
        options
      );
      if (request.ok) {
        // Server accepted my request; wait for data (sent as JSON)
        const response = await request.json();
        cb(response);
      } else {
        err(
          `Server error: ${request.status} ${request.statusText}`
        );
      }
    } catch (error) {
      err(`Network error: ${error.message}`);
    }
  },
};

export default api;
