import GridViewIcon from '@mui/icons-material/GridView';
import styles from './LoginHeader.module.css'

export default function LoginHeader() {
  return (
    <header className={styles['header-div']}>
        <GridViewIcon className={styles.icon}></GridViewIcon>
        <h1>GLOTOOLS</h1>
    </header>
  )
}
