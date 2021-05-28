import styles from "./TimerActions.module.css";
import Button from "../UI/Button";
import Icons from "../Assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import { saveWorkout, timerAction } from "../../store/mainSlice";
import { Link, Route, useHistory } from "react-router-dom";
import Modal from "../UI/Modal";
import Card from "../UI/Card/Card";
import PromptModal from "../Prompt/PromptModal";
import { useRef } from "react";
import audioenable from "../Assets/callouts/audioenabled.mp3";
import _100 from "../Assets/callouts/100.mp3";
// import _1 from "../Assets/callouts/1.mp3";
// import _2 from "../Assets/callouts/100.mp3";
// import _3 from "../Assets/callouts/100.mp3";
// import _4 from "../Assets/callouts/100.mp3";
// import _5 from "../Assets/callouts/100.mp3";
// import _10 from "../Assets/callouts/100.mp3";
// import _20 from "../Assets/callouts/100.mp3";
// import _30 from "../Assets/callouts/100.mp3";
// import _40 from "../Assets/callouts/100.mp3";
// import _50 from "../Assets/callouts/100.mp3";
// import _60 from "../Assets/callouts/100.mp3";
// import _70 from "../Assets/callouts/100.mp3";
// import _80 from "../Assets/callouts/100.mp3";
// import _90 from "../Assets/callouts/100.mp3";
// import _100 from "../Assets/callouts/100.mp3";
// import _200 from "../Assets/callouts/100.mp3";
// import _300 from "../Assets/callouts/100.mp3";
// import _400 from "../Assets/callouts/100.mp3";
// import _500 from "../Assets/callouts/100.mp3";
// import _600 from "../Assets/callouts/100.mp3";
// import _700 from "../Assets/callouts/100.mp3";
// import _700 from "../Assets/callouts/100.mp3";
// import _700 from "../Assets/callouts/100.mp3";
// import _700 from "../Assets/callouts/100.mp3";
// import _700 from "../Assets/callouts/100.mp3";
// import _700 from "../Assets/callouts/100.mp3";
// import _700 from "../Assets/callouts/100.mp3";
// import _700 from "../Assets/callouts/100.mp3";
// import _700 from "../Assets/callouts/100.mp3";
// import _700 from "../Assets/callouts/100.mp3";
// import _700 from "../Assets/callouts/100.mp3";
// import _700 from "../Assets/callouts/100.mp3";
// import _700 from "../Assets/callouts/100.mp3";

const TimerActions = () => {
  const audioEnableRef = useRef();
  const _100Ref = useRef();
  const dispatch = useDispatch();
  const workout = useSelector((state) => state.timer.workoutData);
  const history = useHistory();
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

  function onRedirectHandler() {
    if (workout.parts[0].timings.length === 0) {
      history.push("/timer/warning");
      return;
    }
    history.push("/timer/save");
  }

  function onAudioActivate() {
    console.log(audioEnableRef.current);
    audioEnableRef.current.play();
    _100Ref.current.play();
  }

  return (
    <>
      <Route path="/timer/exit">
        <PromptModal
          title="Exit Confirmation"
          description={[
            "Are you sure you want to quit this workout? All your progress will be lost.",
            "Even if you did not manage to complete all the sets, you should still save the workout for us to process the results and adapt your training accordingly.",
          ]}
          cancel="Cancel"
          accept="Exit Workout"
          acceptColor="red"
          path="/run"
        />
      </Route>
      <Route path="/timer/warning">
        <PromptModal
          title="Warning"
          description={[
            "You have not recorded any timings yet. Please log a timing and try again.",
            "To log a timing, please press the start button and then the split button when you are done with the set distance.",
          ]}
          cancel="Go Back"
        />
      </Route>
      <Route path="/timer/save">
        <PromptModal
          title="Save Confirmation"
          description={[
            "Are you sure you want to save workout?",
            "Upon confirming, we will immediately process your training results and find the next training for you.",
          ]}
          cancel="Cancel"
          accept="Save Workout"
          acceptColor="green"
          saveHandler={() => {
            history.goBack();
            dispatch(saveWorkout(workout));
          }}
        />
      </Route>
      <div className={styles["timer__actions"]}>
        <Link to="/timer/exit">
          <Button length="circle" className={styles["action__item"]} color="red-fill">
            {Icons["close"]}
          </Button>
        </Link>
        <Button length="circle" className={styles["action__item"]} color="yellow-fill">
          {Icons["logs"]}
        </Button>
        <Button
          onClickHandler={onAudioActivate}
          length="circle"
          className={styles["action__item"]}
          color="blue-fill"
        >
          {Icons["audio"]}
        </Button>
        <Button
          length="circle"
          onClickHandler={onRedirectHandler}
          className={styles["action__item"]}
          color="green-fill"
        >
          {Icons["save"]}
        </Button>
      </div>
      <div className={styles["audio__list"]}>
        <audio ref={audioEnableRef}>
          <source src={audioenable} />
        </audio>
        <audio ref={_100Ref}>
          <source src={_100} />
        </audio>
      </div>
    </>
  );
};

export default TimerActions;
