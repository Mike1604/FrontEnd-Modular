import { useState, useEffect, useRef } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import "./Study.modules.css";
import { useSelector } from "react-redux";
import ReactCardFlip from "react-card-flip";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLocation } from "react-router";
import {
    getUserData,
  } from "../services/userService";
import { recordSessionData} from "../services/statsService";

export default function Study() {
    const location = useLocation();
    const [isFlipped, setIsFlipped] = useState(true)
    const [cards, setCards] = useState([])
    const [cardsInitialLength, setCardsInitialLength] = useState(0)
    const [barWidth, setBarWidth] = useState("100%")
    const audioRefs = useRef([]); // Array to hold refs for each audio element
    const [completed, setCompleted] = useState(false)
    const [userData, setUserData] = useState(null)

    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());


    const userId = useSelector((state) => state.auth.userId);

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
    

    const playAudio = (index) => {
        if (audioRefs.current[index]) {
            audioRefs.current[index].play(); // Play the audio corresponding to the index
        }
    };

    const flipCard = () => {
        setIsFlipped(!isFlipped)
    }



    const thumbsUp = () => {
        setCorrectCount(prev => prev + 1);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                owner: cards[0].owner,
                id: cards[0].id,
                review: cards[0].review,
                retained: cards[0].retained
            }
            )
        };

        fetch('http://127.0.0.1:8000/good', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            });

        setIsFlipped(true) // sets cards to normal unrevealed position
        if (isFlipped) {
            if (cards.length) {
                setCards(cards.slice(1));
            } else {
                setCompleted(true);
            }

            let number = Math.round((100 / cardsInitialLength) * (cards.length - 1))
            setBarWidth(number.toString() + "%");
        } else {
            setTimeout(() => {
                if (cards.length) {
                    setCards(cards.slice(1));
                } else {
                    setCompleted(true);
                }

                let number = Math.round((100 / cardsInitialLength) * (cards.length - 1))
                setBarWidth(number.toString() + "%");
            }, 450);
        }
    }

    const thumbsDown = () => {
        setIncorrectCount(prev => prev + 1);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                owner: cards[0].owner,
                id: cards[0].id,
                review: cards[0].review,
                retained: cards[0].retained
            }
            )
        };

        fetch('http://127.0.0.1:8000/bad', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            });

        fetch('http://127.0.0.1:8000/failed_inc/' + userData.id) // TODO

        setIsFlipped(true) // sets cards to normal unrevealed position
        if (isFlipped) {
            if (cards.length) {
                setCards(cards.slice(1));
            } else {
                setCompleted(true);
            }

            let number = Math.round((100 / cardsInitialLength) * (cards.length - 1))
            setBarWidth(number.toString() + "%");
        } else {
            setTimeout(() => {
                if (cards.length) {
                    setCards(cards.slice(1));
                } else {
                    setCompleted(true);
                }

                let number = Math.round((100 / cardsInitialLength) * (cards.length - 1))
                setBarWidth(number.toString() + "%");
            }, 450);
        }
    }

    useEffect(() => {
        const fetchCards = () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    deck_name: location.state.name,
                    deck_owner: location.state.owner
                })
            };

            fetch('http://127.0.0.1:8000/fetch-cards', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setCards(data);
                    setCardsInitialLength(data.length);
                    console.log(data)
                    setBarWidth(((100 / cardsInitialLength) * (data.length)).toString() + "%");
                });
        }

        fetchCards();
    }, []);

    //This is used to record session metrics
    useEffect(() => {
        if (completed) {
            const endTime = Date.now();
            const durationMinutes = Math.round((endTime - startTime) / 60000);  // milisegundos a minutos
    
            const sessionData = {
                deck: location.state.name,
                language: userData ? userData.primary_language : "unknown",
                session_duration_minutes: durationMinutes,
                flashcards_studied: cardsInitialLength,
                correct_answers: correctCount,
                incorrect_answers: incorrectCount,
                session_date: new Date().toISOString()
            };
    
            recordSessionData(sessionData)
            .then(response => response.json())
            .then(data => {
                console.log("Session saved:", data);
            })
            .catch(error => {
                console.error("Error saving session:", error);
            });
        }
    }, [completed]);
    

    return (
        <div className={"main_container"}>
            <div className="progress-bar">
                <div className="progress" style={{ width: barWidth }}></div>
            </div>
            {!cards.length ? <h className="topic">Listo, no tienes más cartas pendientes por hoy!</h> :
                <h className="topic">Estudiando {location.state.name}</h>
            }
            {cards.length ?
                <section className="study-section">
                    <div className="top-cards">
                        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
                            <div className="card top-card-revealed">
                                <h1 className="original_input">{cards[0].original_input}<VolumeUpIcon /></h1>
                                <h className="closest_translation">
                                    {cards[0].closest_translations ? cards[0].closest_translations.join(", ") : ""}
                                </h>
                                <p className="description">
                                    {cards[0].definition ? cards[0].definition : ""}
                                </p>

                                <b className="uses">Ejemplos de uso</b>
                                {cards[0].examples ?
                                    cards[0].examples.map((item, key) => (
                                        <div className="example" key={key}>
                                            <p>"{item}"</p>
                                            <p><VolumeUpIcon onClick={() => playAudio(key)} /></p>
                                            <audio ref={el => audioRefs.current[key] = el} src={cards[0].examples_audio_path[key]} />
                                        </div>
                                    ))
                                    : <></>}
                                <ThreeSixtyIcon className="flipper" onClick={flipCard} fontSize="large" />
                            </div>
                            <div className="card top-card-unrevealed" onClick={flipCard}>
                                <img src={cards[0].image} alt={cards[0].image_prompt} />
                                <h2>{cards[0].original_input}</h2>
                            </div>
                        </ReactCardFlip>
                    </div>
                    <div className="rate">
                        <div className="circle" onClick={thumbsDown}>
                            <ThumbDownIcon fontSize="inherit" color="inherit" className="red" />
                        </div>
                        <div className="circle" onClick={thumbsUp}>
                            <ThumbUpIcon fontSize="inherit" color="inherit" className="green" />
                        </div>
                    </div>
                </section>
                :
                <div className="completed">
                    <CheckCircleIcon fontSize="inherit" />
                    <h1>Completado</h1>
                </div>
            }
        </div>
    );
}