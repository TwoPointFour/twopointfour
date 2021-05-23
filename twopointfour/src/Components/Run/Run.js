import { useSelector } from "react-redux";
import CardNotFound from "../UI/CardNotFound";
import styles from "./Run.module.css";
import RunItem from "./RunItem";

const Run = () => {
  const nextWorkout = useSelector((state) => state.workout.nextWorkout);
  console.log(nextWorkout);
  // const nextWorkout = false;
  return (
    <div className={styles.run}>
      <h1>Upcoming Workouts</h1>
      <div className={styles.runWrapper}>
        {nextWorkout && <RunItem workoutInfo={nextWorkout} color="white" />}
        {!nextWorkout && (
          <CardNotFound
            title="No Workouts Found"
            description="No workouts avaiable as runner's questionnaire is empty. Please fill in the runner's questionnaire to receive workout suggestions."
            button="Fill in questionnaire"
            path="/questionnaire"
          />
        )}
      </div>
    </div>
  );
};

export default Run;
