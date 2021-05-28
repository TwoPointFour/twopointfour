import InfoItem from "./InfoItem";
import styles from "./Info.module.css";
import { useSelector } from "react-redux";
import { msToMinS } from "../Helper/Complementary";
import MetricsCard from "../UI/Metrics/MetricsCard";
import MetricsMini from "../UI/Metrics/MetricsMini";

const Info = () => {
  const set = useSelector((state) => state.timer.setCount);
  const distance = useSelector((state) => state.timer.distance);
  const previousSetTime = useSelector((state) => state.timer.workoutData.parts[0].timings[set - 1]);
  return (
    <div className={styles.info}>
      {/* <InfoItem
        className={styles.previous}
        title="Previous Set"
        value={msToMinS(previousSetTime)}
      /> */}
      <MetricsMini
        size="large"
        title="Previous"
        className={styles.previous}
        number={previousSetTime ? msToMinS(previousSetTime) : ""}
        units="min"
      />
      {/* <InfoItem className={styles.set} title="Set" value={set} /> */}
      <MetricsMini size="large" title="Sets" className={styles.set} number={set} />
      <MetricsMini
        size="large"
        title="Distance"
        className={styles.distance}
        number={distance}
        units="m"
      />
      {/* <InfoItem className={styles.distance} title="Distance" value={`${distance}m`} /> */}
    </div>
  );
};

export default Info;
