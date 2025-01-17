import GridViewIcon from '@mui/icons-material/GridView';
import styles from './LoginHeader.module.css';
import { useNavigate } from 'react-router';

export default function GlotoolsHeader({ className }) {
  const navigate = useNavigate(); // Hook para navegación

  const handleClick = () => {
    console.log("here");
    navigate("/");
  };

  return (
    <div className={`${styles['header-div']} ${className || ''}`} onClick={handleClick}>
      <GridViewIcon />
      <h1>GLOTOOLS</h1>
    </div>
  );
}
