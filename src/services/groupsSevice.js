export const getGroups = async () => {
  try {
    const URL = `http://localhost:8001/groups/`;
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
    console.log("Group data fetched: ", result);
    return result;
  } catch (error) {
    console.error("Error while fetching group data", error);
    throw error;
  }
};

export const createGroup = async (groupData) => {
  try {
    const formData = new FormData();
    formData.append("group_name", groupData.group_name);
    formData.append("group_description", groupData.group_description);
    formData.append("owner", groupData.owner);

    if (groupData.group_picture) {
      formData.append("group_picture", groupData.group_picture);
    }

    console.log("Form Data to send: ", formData);

    const URL = `http://localhost:8001/groups/`;

    const response = await fetch(URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        `Errorcode: ${response.status} Error: ${response.statusText}`
      );
    }

    const result = await response.json();
    console.log("New group created: ", result);
    return result;
  } catch (error) {
    console.error("Error while creating group", error);
    throw error;
  }
};
