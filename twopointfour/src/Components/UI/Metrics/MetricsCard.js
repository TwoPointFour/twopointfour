import Icons from "../../Assets/Icons";
import IconCircular from "../IconCircular";
import styles from "./MetricsCard.module.css";
import MetricsNumber from "./MetricsNumber";

const MetricsCard = (props) => {
  const MetricsDescription = (
    <div className={styles["metrics__description"]}>
      <div className={styles["metrics__description-icon"]}>{Icons["target"]}</div>
      <div className={styles["metrics__description-text"]}>{props.description}</div>
    </div>
  );
  return (
    <div className={`${styles.metrics} ${props.className}`}>
      <div className={styles["metrics__icon"]}>
        {Icons[props.icon || props.title.toLowerCase()]}
      </div>
      <div className={styles["metrics__details"]}>
        <div className={styles["metrics__title"]}>
          <h5>{props.title}</h5>
        </div>
        <MetricsNumber number={props.number} units={props.units} />
      </div>
      {props.description && MetricsDescription}
    </div>
  );
};

export default MetricsCard;
