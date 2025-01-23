import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";
import { getGroups } from "../../services/groupsSevice";

export default function Groups() {
  const [groups, setGroups] = useState(["yo"]);

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

  return (
    <div className="groups-page">
      <Link to={"/groups"}>
        <h2 className="title-right-line">Mis grupos</h2>
      </Link>
      <Outlet context={{ groups, handleNewGroup }} />
    </div>
  );
}
