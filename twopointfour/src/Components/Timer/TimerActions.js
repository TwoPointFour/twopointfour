import styles from "./TimerActions.module.css";
import Button from "../UI/Button";
import Icons from "../Assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import { saveWorkout, timerAction } from "../../store/mainSlice";

const TimerActions = () => {
  const dispatch = useDispatch();
  const workout = useSelector((state) => state.timer.workoutData);
  const testData = {
    workout_ID: "1006",
    type: "Distance Interval",
    segment: "primary",
    difficultyMultiplier: 66.8,
    personalisedDifficultyMultiplier: 132.97469952420278,
    parts: [
      {
        distance: 1000,
        part_ID: "1006_0",
        restMultiplier: 4.5,
        sets: 3,
        timings: [250000, 250000, 250000],
        rest: 115,
        pace: 25000,
      },
    ],
  };

  const saveWorkoutHandler = () => {
    console.log("Save activated!");
    dispatch(saveWorkout(workout));
  };
  return (
    <div className={styles["timer__actions"]}>
      <Button length="circle" className={styles["action__item"]} color="red-fill">
        {Icons["close"]}
      </Button>
      <Button length="circle" className={styles["action__item"]} color="yellow-fill">
        {Icons["logs"]}
      </Button>
      <Button
        onClickHandler={saveWorkoutHandler}
        length="circle"
        className={styles["action__item"]}
        color="green-fill"
      >
        {Icons["save"]}
      </Button>
    </div>
  );
};

export default TimerActions;
