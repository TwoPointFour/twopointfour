import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timerAction } from "../../store/mainSlice";
import Info from "./Info";
import LargeClock from "./LargeClock";
import SmallClock from "./SmallClock";
import styles from "./Timer.module.css";
import TimerActions from "./TimerActions";
import TimerControl from "./TimerControl";

const Timer = () => {
  const workoutInfo = useSelector((state) => state.workout.nextWorkout);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(timerAction.initialiseTimer(workoutInfo));
    console.log("Timer re-rendered!");
  }, [workoutInfo]);

  return (
    <div className={styles.timer}>
      <LargeClock />
      <SmallClock />
      <TimerActions />
      <Info />
      <TimerControl />
    </div>
  );
};

export default Timer;
