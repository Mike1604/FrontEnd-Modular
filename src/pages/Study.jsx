import { useState, useEffect, useRef } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import "./Study.modules.css";
import ReactCardFlip from "react-card-flip";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';

export default function Study() {
    const [isFlipped, setIsFlipped] = useState(true)
    const [cards, setCards] = useState([])
    const [cardsInitialLength, setCardsInitialLength] = useState(0)
    const [barWidth, setBarWidth] = useState("100%")
    const audioRefs = useRef([]); // Array to hold refs for each audio element

    const playAudio = (index) => {
        if (audioRefs.current[index]) {
            audioRefs.current[index].play(); // Play the audio corresponding to the index
        }
    };

    const flipCard = () => {
        setIsFlipped(!isFlipped)
    }

    const thumbsUp = () => {
        if(cards.length) {
            setCards(cards.slice(1));
        } 

        let number = Math.round((100 / cardsInitialLength) * (cards.length - 1))
        setBarWidth(number.toString() + "%");
        console.log(barWidth)
    }

    useEffect(() => {
        const fetchCards = () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  deck_name: "Japones",
                  deck_owner: "Randy"
                })
            };
        
            fetch('http://127.0.0.1:8000/fetch-cards', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setCards(data);
                    setCardsInitialLength(data.length);
                    setBarWidth(((100 / cardsInitialLength) * (data.length)).toString() + "%");
                });
        }

        fetchCards();
    }, []);

    return (
        <div className={"main_container"}>
            <div className="progress-bar">
                <div className="progress" style={{width: barWidth}}></div>
            </div>
            <h className="topic">Estudiando "Ingles para tontos"</h>
            { cards.length ? 
            <section className="study-section">
                <div className="top-cards">
                    <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
                        <div className="card top-card-revealed">
                            <h1 className="original_input">{cards[0].original_input}<VolumeUpIcon /></h1>
                            <h className="closest_translation">
                                {cards[0].closest_translations ? cards[0].closest_translations.join(", ") : "" }
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
                            <ThreeSixtyIcon className="flipper" onClick={flipCard} fontSize="large"/>
                        </div>
                        <div className="card top-card-unrevealed" onClick={flipCard}>
                            <img src={cards[0].image} alt={cards[0].image_prompt} />
                            <h2>{cards[0].original_input}</h2>
                        </div>
                    </ReactCardFlip>
                </div>
                <div className="rate">
                    <div className="circle">
                        <ThumbDownIcon fontSize="inherit" color="inherit" className="red"/>
                    </div>
                    <div className="circle" onClick={thumbsUp}>
                        <ThumbUpIcon fontSize="inherit" color="inherit" className="green"/>
                    </div>
                </div>
            </section>
            : <></>}
        </div>
    );
}