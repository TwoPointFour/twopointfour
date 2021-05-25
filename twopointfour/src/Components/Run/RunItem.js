import { Link } from "react-router-dom";
import Icons from "../Assets/Icons";
import Button from "../UI/Button";
import Card from "../UI/Card/Card";
import Chip from "../UI/Chip";
import MetricsCard from "../UI/Metrics/MetricsCard";
import styles from "./RunItem.module.css";

const RunItem = (props) => {
  const {
    type,
    parts: [info],
  } = props.workoutInfo;
  return (
    <Card color="white" parentClassName={styles.workout}>
      <div className={styles.header}>
        <div className={styles["header__chips"]}>
          <Chip color="yellow">{type}</Chip>
          <Chip color="yellow">Week 1</Chip>
        </div>
        <div className={styles["header__info"]}>{Icons["info"]}</div>
      </div>
      <div className={styles["metrics"]}>
        <MetricsCard title="Sets" number={info.sets} units="" />
        <MetricsCard title="Distance" number={info.distance} units="m" />
        <MetricsCard title="Rest" number={info.rest} units="s" />
        <MetricsCard title="Pace" number={Math.floor(info.pace / 1000)} units="s/100m" />
      </div>
      <Link to="/timer">
        <Button className={styles.button} length="long" color="yellow">
          <h5>Start Workout Now</h5>
        </Button>
      </Link>
    </Card>
  );
};

export default RunItem;
