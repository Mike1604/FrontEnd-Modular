import EditGroup from "./EditGroup";
import "./GroupConfig.css";

export default function GroupConfig({ group }) {
  return (
    <section className="group-config-container">
      <header className="group-info-header">
        <h2>Información del grupo</h2>
      </header>

      <EditGroup group={group} />

      <section className="group-stats-container">
        <h2>Estadísticas</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero,
          quod! Odit quibusdam quis, dolore corporis aperiam tempora velit in,
          minima, nemo molestias natus. Quam molestiae exercitationem corporis
          nostrum facilis reprehenderit?
        </p>
      </section>

      <section className="group-danger-zone">
        <h2>Estadísticas</h2>
        <button>Borrar grupo</button>
      </section>
    </section>
  );
}
