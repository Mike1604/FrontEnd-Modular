import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { PieChart } from "@mui/x-charts/PieChart";
import { Unstable_RadarChart as RadarChart } from "@mui/x-charts/RadarChart";
import { ResponsiveCalendar } from "@nivo/calendar";
import { ViewCarousel, SchoolSharp } from "@mui/icons-material";

import "./Home.css";
import { getUserData } from "../../services/userService";
import { getGroups } from "../../services/groupsSevice";
import { getSessionData } from "../../services/statsService";
import GroupItem from "../Groups/GroupItem";

const aggregateByAnswerType = (sessions) => {
  let totalCorrect = 0;
  let totalIncorrect = 0;

  sessions.forEach((session) => {
    totalCorrect += session.correct_answers;
    totalIncorrect += session.incorrect_answers;
  });

  return [
    { id: "Correctas", value: totalCorrect, label: "Correctas" },
    { id: "Incorrectas", value: totalIncorrect, label: "Incorrectas" },
  ];
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

  const pieData = aggregateByAnswerType(studyStats);
  const totalPieAnswers = pieData.reduce((sum, item) => sum + item.value, 0);

  const languageStats = studyStats.reduce((acc, session) => {
    const lang = session.language;
    if (!acc[lang]) {
      acc[lang] = 0;
    }
    acc[lang] += session.flashcards_studied;
    return acc;
  }, {});

  const radarChartData = Object.values(languageStats);
  return (
    <div className="home-cont">
      <div>
        <h2 className="welcome-text">{`Hola, ${userName}`}</h2>
        
      </div>
      <div className="my-data-home">
        <div className="chart-container">
        <h2>Tu actividad este año</h2>
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
            margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
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
            height={"150"}
          />
        </div>
      </div>

      <div className="home-sect-container">
        <section>
          <h2>Precisión de Respuestas</h2>
          <PieChart
            series={[
              {
                data: pieData,
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
                valueFormatter: (item) =>
                  `${((item.value / totalPieAnswers) * 100).toFixed(1)}%`,
              },
            ]}
            width={200}
            height={200}
          />
        </section>
      </div>

      <section>
        <h1>Tus grupos</h1>
        <div className="groups-home">
          {groups.map((group, index) => (
            <GroupItem key={index} group={group} />
          ))}
        </div>
      </section>

      <div className="home-sect-container">
        <section>
          <h2>Resumen por idioma</h2>
          <RadarChart
            height={300}
            series={[{ label: `${userName}`, data: radarChartData }]}
            radar={{
              max: 120,
              metrics: ["Inglés", "Español", "Francés", "Alemán", "Italiano"],
            }}
          />
        </section>
      </div>
    </div>
  );
}
