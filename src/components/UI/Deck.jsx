import { useNavigate } from "react-router";
import SettingsIcon from '@mui/icons-material/Settings';

const Deck = ({ name, image, owner }) => {
    const navigate = useNavigate();

    const redirect = () => {
        console.log("redirecting to...")
        navigate('/study', {state: {name: name, owner: owner }})
    }

    return (
        <div className="deck" onClick={redirect}>
            <img src={"./" + image}/>
            <div className="deck_lower">
                <p>{name}</p>
                <SettingsIcon />
            </div>
        </div>
    );
};

export default Deck;
