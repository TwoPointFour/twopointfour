// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Route } from "react-router";
// import { timerAction } from "../../store/mainSlice";
// import TutorialTimer from "../Tutorial/TutorialTimer";
// import Info from "./Info";
// import LargeClock from "./LargeClock";
// import SmallClock from "./SmallClock";
// import styles from "./Timer.module.css";
// import TimerActions from "./TimerActions";
// import TimerControl from "./TimerControl";

// const Timer = () => {
//   const workoutInfo = useSelector((state) => state.workout.nextWorkout);
//   const state = useSelector((state) => state);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(timerAction.initialiseTimer(workoutInfo));
//     console.log("Timer re-rendered!");
//     console.log(state);
//   }, [workoutInfo]);

//   return (
//     <div className={styles.timer}>
//       <LargeClock />
//       <SmallClock />
//       <TimerActions />
//       <Info />
//       <TimerControl />
//       <Route path="/timer/tutorial">
//         <TutorialTimer />
//       </Route>
//     </div>
//   );
// };

// export default Timer;
