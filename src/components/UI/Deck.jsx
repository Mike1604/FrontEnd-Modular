import { useNavigate } from "react-router";
import SettingsIcon from '@mui/icons-material/Settings';

const Deck = ({ name, image, owner }) => {
    const navigate = useNavigate();

    const redirect = () => {
        navigate('/study', {state: {name: name, owner: owner }})
    }

    const configure = () => {
        navigate('/view-deck', {state: {name: name, owner: owner }})
    }

    return (
        <div className="deck">
            <img src={"./" + image} onClick={redirect}/>
            <div className="deck_lower">
                <p onClick={redirect}>{name}</p>
                <SettingsIcon onClick={configure} className="deck_lower_icon"/>
            </div>
        </div>
    );
};

export default Deck;
