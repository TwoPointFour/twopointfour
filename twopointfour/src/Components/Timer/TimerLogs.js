import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Icons from "../Assets/Icons";
import { msToMinS } from "../Helper/Complementary";
import Card from "../UI/Card/Card";
import MetricsMini from "../UI/Metrics/MetricsMini";
import Modal from "../UI/Modal";
import Table from "../UI/Table";
import styles from "./TimerLogs.module.css";

const TimerLogs = () => {
  const workoutData = useSelector((state) => state.timer.workoutData);
  const { distance, pace, rest, sets, timings } = workoutData.parts[0];
  const targetSetTime = parseInt(distance / 100) * pace;
  const tableData = Array.from({ length: sets }, (x, i) => i).map((ele, i) => {
    if (timings[i] <= targetSetTime) return [msToMinS(timings[i]), "✅"];
    if (timings[i] > targetSetTime) return [msToMinS(timings[i]), "😩"];
    if (i > timings.length - 1) return ["", "⬜"];
  });

  return (
    <Modal>
      <Card parentClassName={styles.logs} color="white">
        <section className={styles.section}>
          <h3>Workout Timings</h3>
          <Link to="/timer">
            <span className={styles["logs__close"]}>{Icons["close"]}</span>
          </Link>
        </section>
        <Table size="large" data={tableData}></Table>
        <MetricsMini
          title="Target / set"
          units="min"
          number={msToMinS(targetSetTime)}
        ></MetricsMini>
      </Card>
    </Modal>
  );
};

export default TimerLogs;
