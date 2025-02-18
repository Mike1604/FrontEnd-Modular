import { useState, useEffect, useRef } from "react";
import ReactCardFlip from "react-card-flip";
import "./Card.css";

// Imports from Material UI
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Card = ({ data }) => {
    const audioRefs = useRef([]); // Array to hold refs for each audio element
    const [isFlipped, setIsFlipped] = useState(true)
    const [imageExists, setImageExists] = useState(false)
    const generationMessage = ""
    let intervalId = null;

    const flipCard = () => {
        setIsFlipped(!isFlipped)
    }

    const checkForImage = () => {
        const img = new Image()
        img.src = data.image

        img.onload = () => {
            setImageExists(true)
            // Cleanup the interval on component unmount
            clearInterval(intervalId)
        }
    }

    if (data.image && !imageExists) {
        // Card data received but image might not be available
        intervalId = setInterval(checkForImage, 500)
    }

    const playAudio = (index) => {
        if (audioRefs.current[index]) {
            audioRefs.current[index].play(); // Play the audio corresponding to the index
        }
    };

    return (
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
            <div className="card top-card-revealed">
                <h1 className="original_input">{data.original_input ? data.original_input : generationMessage}<VolumeUpIcon /></h1>
                <h4 className="closest_translation">
                    {data.closest_translations ? data.closest_translations.join(", ") : ""}
                </h4>
                <p className="description">
                    {data.definition ? data.definition : ""}
                </p>

                <b className="uses">Ejemplos de uso</b>
                {data.examples ?
                    data.examples.map((item, key) => (
                        <div className="example" key={key}>
                            <p>"{item}"</p>
                            <p><VolumeUpIcon onClick={() => playAudio(key)} /></p>
                            <audio ref={el => audioRefs.current[key] = el} src={data.examples_audio_path[key]} />
                        </div>
                    ))
                    : null
                }
                <ThreeSixtyIcon className="flipper" onClick={flipCard} fontSize="large" />
            </div>
            <div className="card top-card-unrevealed" onClick={flipCard}>
                {imageExists ?
                    <img src={data.image} /> :
                    <Box sx={{ display: 'flex', flexDirection: "column", textAlign: "center", justifyContent: "center", width: "100%", height: "100%", alignItems: "center" }}>
                        <CircularProgress />
                    </Box>
                }

                <h2>{data.original_input ? data.original_input : generationMessage}</h2>
            </div>
        </ReactCardFlip>
    );
};

export default Card;
