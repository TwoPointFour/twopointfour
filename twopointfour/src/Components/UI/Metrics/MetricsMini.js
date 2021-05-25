import styles from "./MetricsMini.module.css";

const MetricsMini = (props) => {
  return (
    <div className={styles.metrics}>
      <div className={styles["metrics__details"]}>
        <div className={styles["metrics__title"]}>
          <span>{props.title}</span>
        </div>
        <div className={styles.number}>
          <div className={styles.digit}>{props.number}</div>
          <div className={styles.unit}>{props.units}</div>
        </div>
      </div>
    </div>
  );
};

export default MetricsMini;
