export const getUserData = async (userId) => {
  try {
    const URL = `http://localhost:8001/users/${userId}`;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error while fetching user data", error);
    throw error;
  }
};

export const searchEmails = async (query) => {
  try {
    const URL = `http://localhost:8001/users/find-users-email?email=${query}`;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("User data fetched: ", result);
    return result;
  } catch (error) {
    console.error("Error while fetching user data", error);
    throw error;
  }
};

export const getBatchOfUsers = async (usersId) => {
  try {
    const URL = `http://localhost:8001/users/batch`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_ids: usersId }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Users by batch fetched: ", result);
    return result;
  } catch (error) {
    console.error("Error while fetching users in batch", error);
    throw error;
  }
};

export const updateUserData = async (userId, userData) => {
  try {
    const URL = `http://localhost:8001/users/${userId}`;

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("User data updated: ", result);
    return result;
  } catch (error) {
    console.error("Error while updating user data", error);
    throw error;
  }
};

export const updateUserProfilePicture = async (userId, profilePicture) => {
  try {
    const URL = `http://localhost:8001/users/${userId}/profile-picture`;

    const formData = new FormData();

    formData.append("profile_picture", profilePicture);

    const response = await fetch(URL, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("User profile picture updated: ", result);
    return result;
  } catch (error) {
    console.error("Error while updating user profile picture", error);
    throw error;
  }
};
