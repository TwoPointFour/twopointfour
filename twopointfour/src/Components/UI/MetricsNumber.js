import styles from "./MetricsNumber.module.css";

const MetricsNumber = (props) => {
  return (
    <div className={styles.number}>
      <div className={styles.digit}>{props.number}</div>
      <div className={styles.unit}>{props.units}</div>
    </div>
  );
};

export default MetricsNumber;
