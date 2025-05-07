import { useEffect, useState } from "react";

import { Gauge } from "@mui/x-charts/Gauge";

import { getUserLevel } from "../../services/NeuralNet";

export default function UserLevelDisplay({ userId }) {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userLevel = await getUserLevel(userId);
        setLevel(userLevel);
      } catch (error) {
        console.log("An error occurred", error);
      }
    };
    fetchData();
  }, [userId]);

  let percentage = 0;
  let label = "";

  switch (level) {
    case 0:
      percentage = 25;
      label = "A";
      break;
    case 1:
      percentage = 65;
      label = "B";
      break;
    case 2:
      percentage = 100;
      label = "C";
      break;
    default:
      break;
  }

  return (
    <div className="gauge-container">
      <Gauge
        value={percentage}
        min={0}
        max={100}
        width={200}
        height={200}
        text={""}
      />
      <div className="gauge-label">{label}</div>
    </div>
  );
}
