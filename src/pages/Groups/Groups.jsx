import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

import CircularProgress from "@mui/material/CircularProgress";

import { getGroups } from "../../services/groupsSevice";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //Todo: remove this when JWT available
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setIsLoading(true);
        const data = await getGroups(userId);
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setIsLoading(false);
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

  return isLoading ? (
    <CircularProgress />
  ) : (
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
