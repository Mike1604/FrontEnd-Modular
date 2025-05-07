export const getUserLevel = async (userId) => {
    try {
      const URL = `http://localhost:8000/neural?/${userId}`;
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
      console.log("User level fetched: ", result);
      return result;
    } catch (error) {
      console.error("Error while getting user level", error);
      throw error;
    }
  };