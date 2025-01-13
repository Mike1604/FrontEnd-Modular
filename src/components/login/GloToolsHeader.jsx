import GridViewIcon from '@mui/icons-material/GridView';
import styles from './LoginHeader.module.css';

// eslint-disable-next-line react/prop-types
export default function GlotoolsHeader({ className }) {
  return (
    <div className={`${styles['header-div']} ${className || ''}`}>
      <GridViewIcon/>
      <h1>GLOTOOLS</h1>
    </div>
  );
}
