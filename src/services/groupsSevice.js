export const getGroups = async () => {
  try {
    const URL = `http://localhost:8001/groups/`;

    const token = localStorage.getItem("authToken");

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
    console.log("Group data fetched: ", result);
    return result;
  } catch (error) {
    console.error("Error while fetching group data", error);
    throw error;
  }
};

export const getGroup = async (groupId) => {
  try {
    const token = localStorage.getItem("authToken");

    const URL = `http://localhost:8001/groups/${groupId}`;
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
    console.log("Group data fetched: ", result);
    return result;
  } catch (error) {
    console.error("Error while fetching group data", error);
    throw error;
  }
};

export const updateGroup = async (groupID, data) => {
  const formData = new FormData();
  formData.append("group_name", data.group_name);
  formData.append("group_description", data.group_description);

  if (data.group_picture) {
    formData.append("group_picture", data.group_picture);
  }

  const token = localStorage.getItem("authToken");

  const response = await fetch(`http://localhost:8001/groups/${groupID}`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    }
  });

  if (!response.ok) throw new Error("Error al actualizar el grupo");
  console.log("Group updated ", response);

  return response.json();
};

export const createGroup = async (groupData) => {
  try {
    const formData = new FormData();
    formData.append("group_name", groupData.group_name);
    formData.append("group_description", groupData.group_description);

    if (groupData.group_picture) {
      formData.append("group_picture", groupData.group_picture);
    }

    console.log("Form Data to send: ", formData);

    const token = localStorage.getItem("authToken");

    const URL = `http://localhost:8001/groups/`;

    const response = await fetch(URL, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
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
    const token = localStorage.getItem("authToken");

    const URL = `http://localhost:8001/groups/${groupId}`;

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
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

export const addMemberToGroup = async (groupid, userId) => {
  try {
    const token = localStorage.getItem("authToken");

    const URL = `http://localhost:8001/groups/${groupid}/members`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ user_id: userId }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Member added to group: ", result);
    return result;
  } catch (error) {
    console.error("Error while adding member to group", error);
    throw error;
  }
};

export const removeMemberFromGroup = async (groupid, userId) => {
  try {
    const token = localStorage.getItem("authToken");

    const URL = `http://localhost:8001/groups/${groupid}/members`;
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ user_id: userId }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Member removed from group: ", result);
    return result;
  } catch (error) {
    console.error("Error while removing member from group", error);
    throw error;
  }
};

export const getGroupPosts = async (groupId) => {
  try {
    const token = localStorage.getItem("authToken");

    const URL = `http://localhost:8001/groups/${groupId}/posts`;
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
    console.log("Group posts fetched: ", result);
    return result;
  } catch (error) {
    console.error("Error while fetching group posts", error);
    throw error;
  }
};

export const addGroupPost = async (groupId, post) => {
  try {
    const token = localStorage.getItem("authToken");

    const URL = `http://localhost:8001/groups/${groupId}/posts`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Post added to group: ", result);
    return result;
  } catch (error) {
    console.error("Error while adding post to group", error);
    throw error;
  }
};

export const removeGroupPost = async (groupId, postId) => {
  try {
    const URL = `http://localhost:8001/groups/${groupId}/posts/${postId}`;

    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Post removed from group: ", result);
    return result;
  } catch (error) {
    console.error("Error while removing post from group", error);
    throw error;
  }
};
