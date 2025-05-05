export const getSessionData = async (userId) => {
  try {
    const token = localStorage.getItem("authToken");

    const URL = `http://localhost:8001/stats/study-session`;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error while fetching study session stats", error);
    throw error;
  }
};

export const getGroupSessionData = async (groupId) => {
  try {
    const token = localStorage.getItem("authToken");

    const URL = `http://localhost:8001/stats/group-activity-session/${groupId}`;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error while fetching study session stats", error);
    throw error;
  }
};

