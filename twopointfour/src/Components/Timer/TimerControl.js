// import { useDispatch, useSelector } from "react-redux";
// import { startTimer, timerAction } from "../../store/mainSlice";
// import Button from "../UI/Button";
// import styles from "./TimerControl.module.css";

// const TimerControl = () => {
//   const dispatch = useDispatch();

//   //   const updateCountdown = () => {
//   //     dispatch(timerAction.updateSetTime());
//   //     dispatch(timerAction.updatePaceTime());
//   //     console.log(pause);
//   //     if (!pause) setTimeout(updateCountdown, 1000);
//   //   };

//   function timerStartHandler() {
//     dispatch(startTimer());
//   }

//   function timerPauseHandler() {
//     dispatch(timerAction.pauseTimer(true));
//   }
//   function timerSplitHandler() {
//     dispatch(timerAction.splitTimer());
//   }

//   return (
//     <div className={styles["timer__control"]}>
//       <Button onClickHandler={timerStartHandler} color="green" variation="timer">
//         Start
//       </Button>
//       <Button onClickHandler={timerSplitHandler} color="red" variation="timer">
//         Split
//       </Button>
//       <Button onClickHandler={timerPauseHandler} color="yellow" variation="timer">
//         Pause
//       </Button>
//     </div>
//   );
// };

// export default TimerControl;
