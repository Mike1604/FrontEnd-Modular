import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { getGroup, getGroups } from "../../services/groupsSevice";

export default function Groups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGroups();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  const handleNewGroup = async () => {
    try {
      const updatedGroups = await getGroups();
      setGroups(updatedGroups);
    } catch (error) {
      console.error("Error updating groups:", error);
    }
  };

  const handleGroupUpdate = (groupData) => {
    console.log(groupData);

    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupData.id
          ? {
              ...groupData,
            }
          : group
      )
    );
  };

  const handleGroupDeleted = async (groupId) => {
    setGroups((prevGroups) =>
      prevGroups.filter((group) => group.id !== groupId)
    );
  };

  return <Outlet context={{ groups, handleNewGroup, handleGroupUpdate, handleGroupDeleted }} />;
}
