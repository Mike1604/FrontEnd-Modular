import { useState, useEffect, useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { subMonths, parseISO, isAfter, format } from "date-fns";

import { getGroupSessionData } from "../../../services/statsService";

export default function GroupStats({ group }) {
  const [studyStats, setStudyStats] = useState([]);

  useEffect(() => {
    getGroupSessionData(group.id)
      .then(setStudyStats)
      .catch(console.error);
  }, [group.id]);

  const { chartData, filteredStats, pieData } = useMemo(() => {
    const threeMonthsAgo = subMonths(new Date(), 3);
    const filtered = studyStats.filter(item =>
      isAfter(parseISO(item.session_date), threeMonthsAgo)
    );

    const linePoints = filtered
      .map(item => ({
        x: new Date(item.session_date).getTime(),
        y: Number(item.correct_answers),
      }))
      .sort((a, b) => a.x - b.x);

    const totalCorrect = filtered.reduce(
      (sum, s) => sum + Number(s.correct_answers),
      0
    );
    const totalIncorrect = filtered.reduce(
      (sum, s) => sum + Number(s.incorrect_answers),
      0
    );

    const pieFormatted = [
      { id: 'correct', label: 'Correctas', value: totalCorrect },
      { id: 'incorrect', label: 'Incorrectas', value: totalIncorrect }
    ];

    return {
      chartData: linePoints,
      filteredStats: filtered,
      pieData: pieFormatted
    };
  }, [studyStats]);

  console.log(pieData);

  return (
    <section className="group-section-container">
      <div className="group-charts">
        <section className="group-chart-cont">
          <h2>Respuestas correctas</h2>
          <LineChart
            xAxis={[
              {
                data: chartData.map(p => p.x),
                scaleType: "time",
                valueFormatter: v => format(new Date(v), "yyyy-MM-dd"),
              },
            ]}
            series={[{ data: chartData.map(p => p.y), label: "Correct Answers" }]}
            width={600}
            height={400}
          />
        </section>

        <section className="group-chart-cont">
          <h2>Duración vs Aciertos</h2>
          <DurationVsCorrectChart data={filteredStats} />
        </section>

        <section className="group-chart-cont">
          <h2>Distribución Aciertos vs Errores</h2>
          <PieChart
            series={[{ data: pieData }]}
            width={300}
            height={300}
          />
        </section>
      </div>
    </section>
  );
}

function DurationVsCorrectChart({ data }) {
  const pts = useMemo(
    () =>
      data.map(item => ({
        x: Number(item.session_duration_minutes),
        y: Number(item.correct_answers),
      })),
    [data]
  );

  return (
    <ScatterChart
      xAxis={[{ data: pts.map(p => p.x), label: "Minutos de sesión", scaleType: "linear" }]}
      series={[{ data: pts, label: "Aciertos" }]}
      width={600}
      height={400}
    />
  );
}
