import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { getGroups } from "../../services/groupsSevice";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  //Todo: remove this when JWT available
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGroups(userId);
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  const handleNewGroup = async (groupData) => {
    try {
      setGroups((prev) => [...prev, groupData]); 
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

  return (
    <Outlet
      context={{
        groups,
        handleNewGroup,
        handleGroupUpdate,
        handleGroupDeleted,
      }}
    />
  );
}
