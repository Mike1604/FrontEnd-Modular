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

export const getGroup = async (groupId) => {
  try {
    const URL = `http://localhost:8001/groups/${groupId}`;
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

export const updateGroup = async (id, data) => {
  const formData = new FormData();
  formData.append("group_name", data.group_name);
  formData.append("group_description", data.group_description);

  if (data.group_picture) {
    formData.append("group_picture", data.group_picture);
  }

  const response = await fetch(`http://localhost:8001/groups/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) throw new Error("Error al actualizar el grupo");
  return response.json();
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

export const deleteGroup = async (groupId) => {
  try {
    const URL = `http://localhost:8001/groups/${groupId}`;

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Errorcode: ${response.status} Error: ${response.statusText}`
      );
    }

    const result = response.status !== 204 ? await response.json() : null;

    console.log("Group deleted successfully", result);
    return result;
  } catch (error) {
    console.error("Error while deleting group", error);
    throw error;
  }
};
