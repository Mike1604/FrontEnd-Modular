import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

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

export default function GroupStats() {
  return (
    <div>
      <h1>Actividad Diaria</h1>
      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: activityData.map((d) => formatDate(d.date)),
          },
        ]}
        series={[{ data: activityData.map((d) => d.count), label: "Posts" }]}
        width={600}
        height={300}
      />
    </div>
  );
}
