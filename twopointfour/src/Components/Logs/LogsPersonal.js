import { useSelector } from "react-redux";
import CardNotFound from "../UI/Card/CardNotFound";
import LogItem from "./LogItem";
import styles from "./LogsPersonal.module.css";

const LogsPersonal = () => {
  const logs = useSelector((state) => state.workout.logs);
  const logsPresent = logs && Object.keys(logs).length !== 0 && logs.constructor === Object;
  const logList =
    logsPresent &&
    Object.entries(logs).map((ele) => {
      return <LogItem noComments={true} workoutData={[ele[0], ele[1]]} />;
    });
  console.log(logs, logsPresent);

  return (
    <div className={styles.logs}>
      {!logsPresent && (
        <CardNotFound
          title="No Workout Logs"
          description="You have not previous workout logs stored in our database. Please start a workout to see your logs here."
          button="Start a Workout"
          path="/run"
        />
      )}
      {logsPresent && logList}
    </div>
  );
};

export default LogsPersonal;
