import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import "./Leitner.modules.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import { LineChart } from '@mui/x-charts/LineChart';
import { dataset } from './dataset'

export default function Leitner() {
  const navigate = useNavigate();
  const [fillPercentageTotal, setFillPercentageTotal] = useState("0%")
  const [fillForgotten, setFillForgotten] = useState("0%")
  const [fillMemorized, setFillMemorized] = useState("0%")



  // TODO: Fetch total cards in need of review, today
  const calculateTotalCards = () => {
    // Checks for all cards tagged for review today or that
    // last review happened today

    return Math.floor(Math.random() * 38) + 1
  }

  const calculatePendingCards = () => {
    return Math.floor(Math.random() * 19) + 1
  }

  const fill_bars = () => {
    // Works backwards 100%; means no total cards

    let total = calculateTotalCards()
    let pending = calculatePendingCards()
    let number = Math.floor(100 - ((100 / total) * pending))

    setFillPercentageTotal(number.toString() + "%")

    // repeating for other bars, this will be changed

    total = calculateTotalCards()
    pending = calculatePendingCards()
    number = Math.floor(100 - ((100 / total) * pending))

    setFillForgotten(number.toString() + "%")


    total = calculateTotalCards()
    pending = calculatePendingCards()
    number = Math.floor(100 - ((100 / total) * pending))

    setFillMemorized(number.toString() + "%")
  }

  useEffect(() => {
    fill_bars()
    console.log(fillPercentageTotal)
  }, [])

  const ChartsOverviewDemo = () => {
    return (
      <LineChart
        dataset={dataset}
        xAxis={[
          {
            id: 'Years',
            dataKey: 'date',
            scaleType: 'time',
            valueFormatter: (date) => {
              const day = date.getDate().toString().padStart(2, "0"); // Ensure 2-digit day
              const month = date.toLocaleString("default", { month: "short" }); // Get short month name (e.g., Jan, Feb)
              return `${day}/${month}`; // Format as "day/month"
            },
          },
        ]}
        series={[
          {
            id: 'France',
            label: 'Frances',
            dataKey: 'fr',
            stack: 'total',
            area: true,
            showMark: false,
          },
          {
            id: 'Germany',
            label: 'Japones',
            dataKey: 'dl',
            stack: 'total',
            area: true,
            showMark: false,
          },
          {
            id: 'United Kingdom',
            label: 'Ingles',
            dataKey: 'gb',
            stack: 'total',
            area: true,
            showMark: false,
          },
        ]}
        height={420}
        margin={{ left: 70 }}
      />
    );
  }

  return <div className={"main_container"}>
    <div className="top">
      <p>Inicio {">"} Leitner: Sistema de Aprendizaje Espaciado Automatizado</p>
      <div className="shortcuts">
        <button className="create_package" onClick={() => navigate('/crear-baraja')}>Crear paquete</button>
        <button className="create_new_auto_card" onClick={() => navigate('/crear-carta')}>Crear carta automaticamente</button>
        <button className="create_new_auto_card">Crear carta manualmente</button>
        <MoreVertIcon fontSize="large" />
      </div>
    </div>
    <div className="title">
      <h2>Revisa tus estadisticas semanales</h2>
      <div className="line"></div>
    </div>
    <section className="statistics">
      <div className="cardbox-big">
        <ChartsOverviewDemo />
      </div>
      <div className="cardbox" style={{ backgroundColor: "  #43AFCD" }}>
        <div className="cardbox-fill" style={{ height: fillPercentageTotal }}>
          <p className="number">{Math.floor(Math.random() * 19) + 1}</p>
          <p className="stat_text">Cartas por estudiar hoy</p>
        </div>
      </div>
      <div className="cardbox" style={{ backgroundColor: "  #CD5E43" }}>
        <div className="cardbox-fill" style={{ height: fillForgotten }}>
          <p className="number">{Math.floor(Math.random() * 19) + 1}</p>
          <p className="stat_text">Cartas olvidadas</p>
        </div>
      </div>
      <div className="cardbox" style={{ backgroundColor: "  #17C164" }}>
        <div className="cardbox-fill" style={{ height: fillMemorized }}>
          <p className="number">{Math.floor(Math.random() * 19) + 1}</p>
          <p className="stat_text">Cartas memorizadas</p>
        </div>
      </div>
    </section>
    <div className="title">
      <h2>Administra tus paquetes de cartas</h2>
      <div className="line"></div>
    </div>
    <section className="decks_container">
      <div className="deck" onClick={() => navigate('/study')}>
        <img src="./455116372859644_00001_.png" alt="" />
        <div className="deck_lower">
          <p>Frances</p>
          <SettingsIcon />
        </div>
      </div>
      <div className="deck">
        <img src="./198498142358207_00001_.png" alt="" />
        <div className="deck_lower">
          <p>Japones</p>
          <SettingsIcon />
        </div>
      </div>
      <div className="deck">
        <img src="./473437978293388_00001_.png" alt="" />
        <div className="deck_lower">
          <p>English</p>
          <SettingsIcon />
        </div>
      </div>
    </section>
  </div>
}
