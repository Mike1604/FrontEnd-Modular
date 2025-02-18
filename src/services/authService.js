export const loginRequest = async (req) => {
  try {
    const URL = `http://localhost:8001/auth/login`;
    const response = await fetch(URL, {
      method: "POST",
      body: req,
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.detail || `Error: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("Successful login", result);
    return result;
  } catch (error) {
    console.error("Error while trying to login", error.message || error);
    return { error: error.message || "An unknown error occurred" };
  }
};

export const signUpRequest = async (req) => {
  try {
    const URL = `http://localhost:8001/users/`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.detail || `Error: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("User successfully created", result);
    return result;
  } catch (error) {
    console.error("Error while trying to create an user", error.message || error);
    return { error: error.message || "An unknown error occurred" };
  }
};
