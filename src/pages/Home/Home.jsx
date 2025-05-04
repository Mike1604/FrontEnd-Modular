import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { LineChart } from "@mui/x-charts";
import { ResponsiveCalendar } from "@nivo/calendar";
import { ViewCarousel, SchoolSharp } from "@mui/icons-material";

import "./Home.css";
import { getUserData } from "../../services/userService";
import { getGroups } from "../../services/groupsSevice";
import { getSessionData } from "../../services/statsService";
import GroupItem from "../Groups/GroupItem";

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
  const [studyStats, setStudyStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getUserData(userId);
        setUserName(`${userRes.first_name} ${userRes.last_name}`);

        const statsRes = await getSessionData();
        setStudyStats(statsRes);

        const groupRes = await getGroups();
        setGroups(groupRes);
      } catch (error) {
        console.log("An error occurred", error);
      }
    };

    fetchData();
  }, []);

  const grouped = studyStats.reduce((acc, session) => {
    const date = session.session_date.slice(0, 10);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([day, value]) => ({
    day,
    value,
  }));

  return (
    <div className="home-cont">
      <h2 className="welcome-text">{`Hola, ${userName}`}</h2>
      <div className="my-data-home">
        <div className="chart-container">
          <ResponsiveCalendar
            data={data}
            from={
              new Date(new Date().setDate(new Date().getDate() - 1))
                .toISOString()
                .split("T")[0]
            }
            to={new Date().toISOString().split("T")[0]}
            emptyColor="#eeeeee"
            colors={["#9fcfc9", "#6fb1a8", "#3f8985", "#2c6b68"]}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            align="center"
            yearSpacing={0}
            weekdayLegend={["M", "T", "W", "T", "F", "S", "S"]}
            dayBorderWidth={2}
            dayBorderColor="#5e5c5c"
            theme={{
              text: {
                fontSize: 14,
                fill: "#f2eded",
                outlineWidth: 0,
              },
              tooltip: {
                container: {
                  background: "#1e1e1e",
                  color: "#f2eded",
                  fontSize: 12,
                  borderRadius: "4px",
                  padding: "6px 8px",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="home-sect-container">
        <section className="home-sect">
          <Link to={"/study"}>
            <div className="home-box-sect">
              <SchoolSharp className="box-icon" />
            </div>
            <h2>Sesion de estudio</h2>
          </Link>
        </section>

        <section className="home-sect">
          <Link to={"/leitner"}>
            <div className="home-box-sect">
              <ViewCarousel className="box-icon" />
            </div>
            <h2>Leitner</h2>
          </Link>
        </section>
      </div>

      <section className="footer-section">
        <h1>Tus grupos</h1>
        <div className="groups-home">
          {groups.map((group, index) => (
            <GroupItem key={index} group={group} />
          ))}
        </div>
      </section>
    </div>
  );
}
