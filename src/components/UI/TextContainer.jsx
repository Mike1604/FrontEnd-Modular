import  './UIStyles.css'

// eslint-disable-next-line react/prop-types
export default function TextContainer({ text }) {
  return (
    <div className={`textActions`}>
      <h2>{text}</h2>
    </div>
  );
}
