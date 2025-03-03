import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LineChart } from "@mui/x-charts";

import "./Home.css";
import { getUserData } from "../../services/userService";
import { getGroups } from "../../services/groupsSevice";
import GroupItem from "../Groups/GroupItem";

const activityData = [
  { date: "2024-02-01", count: 2 },
  { date: "2024-02-02", count: 5 },
  { date: "2024-02-03", count: 3 },
  { date: "2024-02-04", count: 8 },
  { date: "2024-02-05", count: 4 },
  { date: "2024-02-06", count: 7 },
  { date: "2024-02-07", count: 6 },
];
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Home() {
  const userId = useSelector((state) => state.auth.userId);
  const [userName, setUserName] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getUserData(userId);
        setUserName(`${userRes.first_name} ${userRes.last_name}`);

        const groupRes = await getGroups();
        setGroups(groupRes);
      } catch (error) {
        console.log("An error occurred", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-cont">
      <div className="my-data-home">
        <h2>{`Hola, ${userName}`}</h2>
        <div className="chart-container">
          <LineChart
            height={300}
            xAxis={[
              {
                scaleType: "point",
                data: activityData.map((d) => formatDate(d.date)),
              },
            ]}
            series={[
              { data: activityData.map((d) => d.count), label: "Actividad" },
            ]}
          />
        </div>
      </div>

      <div>Yo</div>
      <div>Yo</div>
      <div className="groups-home">
        {groups.map((group, index) => (
          <GroupItem key={index} group={group} />
        ))}
      </div>
    </div>
  );
}
