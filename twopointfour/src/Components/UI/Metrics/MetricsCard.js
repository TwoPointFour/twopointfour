import Icons from "../../Assets/Icons";
import IconCircular from "../IconCircular";
import styles from "./MetricsCard.module.css";
import MetricsNumber from "./MetricsNumber";

const MetricsCard = (props) => {
  return (
    <div className={`${styles.metrics} ${props.className}`}>
      <div className={styles["metrics__icon"]}>{Icons[props.title.toLowerCase()]}</div>
      <div className={styles["metrics__details"]}>
        <div className={styles["metrics__title"]}>
          <h5>{props.title}</h5>
        </div>
        <MetricsNumber number={props.number} units={props.units} />
      </div>
    </div>
  );
};

export default MetricsCard;
