import { useSelector } from "react-redux";
import CardNotFound from "../UI/Card/CardNotFound";
import styles from "./Run.module.css";
import RunItem from "./RunItem";

const Run = () => {
  const workoutInfo = useSelector((state) => state.workout.nextWorkout);
  const workoutAvailable = workoutInfo?.id;
  console.log(workoutInfo, workoutAvailable);
  return (
    <div className={styles.run}>
      {workoutAvailable && <RunItem workoutInfo={workoutInfo} color="white" />}
      {!workoutAvailable && (
        <CardNotFound
          title="No Workouts Found"
          description="No workouts avaiable as runner's questionnaire is empty. Please fill in the runner's questionnaire to receive workout suggestions."
          button="Fill in questionnaire"
          path="/questionnaire"
        />
      )}
    </div>
  );
};

export default Run;
