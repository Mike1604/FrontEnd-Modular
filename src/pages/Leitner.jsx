import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import "./Leitner.modules.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import { LineChart } from '@mui/x-charts/LineChart';
import { dataset } from './dataset'
import Deck from "../components/UI/Deck";

import {
  getUserData,
} from "../services/userService";

export default function Leitner() {
  const navigate = useNavigate();
  const [fillPercentageTotal, setFillPercentageTotal] = useState("0%")
  const [fillForgotten, setFillForgotten] = useState("0%")
  const [fillMemorized, setFillMemorized] = useState("0%")
  const [pendingToday, setPendingToday] = useState(null)
  const [failed, setFailed] = useState(0)
  const [memorized, setMemorized] = useState(0)

  const [decks, setDecks] = useState([])
  const userId = useSelector((state) => state.auth.userId);
  const [userData, setUserData] = useState(null)


  const fetchPendingToday = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: userData.id
      }
      )
    };
    fetch('http://127.0.0.1:8000/pendingToday', requestOptions)
      .then(response => 
        response.json()
      )
      .then(data => {
        setPendingToday(data)
      });
  }

  // TODO: Fetch total cards in need of review, today
  const calculateTotalCards = () => {
    // Checks for all cards tagged for review today or that
    // last review happened today

    return Math.floor(Math.random() * 38) + 1
  }

  const calculatePendingCards = () => {
    return Math.floor(Math.random() * 19) + 1
  }

  const get_failed_weekly = () => {
    fetch('http://127.0.0.1:8000/failed/' + userData.id).then(response => response.json()).then(data => {setFailed(data)})
  }

  const get_memorized = () => {
    //fetch('http://127.0.0.1:8000/failed/' + userData.id).then(response => response.json()).then(data => {setFailed(data)})
    setMemorized(10)
    return 10
  }

  const fill_bars = () => {
    // Works backwards 100%; means no total cards

    // Pending cards today
    let total = 50
    let pending = pendingToday
    let number = Math.floor(100 - ((100 / total) * pending))

    setFillPercentageTotal(number.toString() + "%")

    // repeating for other bars, this will be changed

    total = 30
    pending = failed
    number = Math.floor(100 - ((100 / total) * failed))

    console.log("failed: " + failed)
    console.log("percentage for pending today: " + number)     

    setFillForgotten(number.toString() + "%")


    total = 100
    pending = 75
    number = Math.floor(100 - ((100 / total) * pending))

    setFillMemorized(number.toString() + "%")
  }

  const fetch_decks = () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: userData.id
        }
        )
      };
      fetch('http://127.0.0.1:8000/decks', requestOptions)
        .then(response => response.json())
        .then(data => setDecks(data));
      console.log("decks fetched")
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          setUserData(await getUserData(userId))
        } else {
          console.error("No userID")
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    if (userData) {
      fetch_decks();
      get_failed_weekly();
      fetchPendingToday();
    }
  }, [userData]);

  useEffect(() => {
    fill_bars()
  }, [pendingToday]);

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
            label: 'Básico',
            dataKey: 'fr',
            stack: 'total',
            area: true,
            showMark: false,
          },
          {
            id: 'Germany',
            label: 'Avanzado',
            dataKey: 'dl',
            stack: 'total',
            area: true,
            showMark: false,
          },
          {
            id: 'United Kingdom',
            label: 'Inglés profesional',
            dataKey: 'gb',
            stack: 'total',
            area: true,
            showMark: false,
          },
        ]}
        height={420}
        margin={{ left: 0 }}
      />
    );
  }

  return <div className={"main_container"}>
    <div className="top">
      <p>Inicio {">"} Leitner: Sistema de Aprendizaje Espaciado Automatizado</p>
      <div className="shortcuts">
        <button className="button_a create_package" onClick={() => navigate('/crear-baraja')}>Crear paquete</button>
        <button className="button_a white_text create_new_auto_card" onClick={() => navigate('/crear-carta')}>Crear carta automaticamente</button>
        <button className="button_a white_text create_new_auto_card">Crear carta manualmente</button>
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
          <p className="number">{pendingToday}</p>
          <p className="stat_text">Cartas por estudiar hoy</p>
        </div>
      </div>
      <div className="cardbox" style={{ backgroundColor: "  #CD5E43" }}>
        <div className="cardbox-fill" style={{ height: fillForgotten }}>
          <p className="number">{failed}</p>
          <p className="stat_text">Cartas olvidadas</p>
        </div>
      </div>
      <div className="cardbox" style={{ backgroundColor: "  #17C164" }}>
        <div className="cardbox-fill" style={{ height: fillMemorized }}>
          <p className="number">{19}</p>
          <p className="stat_text">Cartas memorizadas</p>
        </div>
      </div>
    </section>
    <div className="title">
      <h2>Administra tus paquetes de cartas</h2>
      <div className="line"></div>
    </div>


    <section className="decks_container">
      {decks ? decks.map((deck, key) => (
        <Deck name={deck.name} image={deck.image} owner={userData.id} key={key} />
      )) : null}
    </section>
  </div>
}
