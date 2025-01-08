import styles from './UIStyles.module.css'

// eslint-disable-next-line react/prop-types
export default function TextContainer({ text }) {
  return (
    <div className={styles.textActions}>
      <h2>{text}</h2>
    </div>
  );
}
