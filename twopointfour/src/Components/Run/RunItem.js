import { Link, Route } from "react-router-dom";
import Icons from "../Assets/Icons";
import TutorialRun from "../Tutorial/TutorialRun";
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
    <>
      <TutorialRun />
      <Card color="white" parentClassName={styles.workout}>
        <div className={styles.header}>
          <div className={styles["header__chips"]}>
            <Chip color="yellow">{type}</Chip>
            <Chip color="yellow">Week 1</Chip>
          </div>
          <Link to="/run/tutorial/1">
            <div className={styles["header__info"]}>{Icons["info"]}</div>
          </Link>
        </div>
        <div className={styles["metrics"]}>
          <MetricsCard title="Sets" number={info.sets} units="" />
          <MetricsCard title="Distance" number={info.distance} units="m" />
          <MetricsCard title="Rest" number={info.rest} units="s" />
          <MetricsCard
            title="Pace"
            number={parseFloat(info.pace / 1000).toFixed(2)}
            units="s/100m"
          />
        </div>
        <Link to="/timer">
          <Button className={styles.button} length="long" color="yellow-borderless">
            <h5>Start Workout Now</h5>
          </Button>
        </Link>
      </Card>
    </>
  );
};

export default RunItem;
