import styles from "./TimerActions.module.css";
import Button from "../UI/Button";
import Icons from "../Assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import { saveWorkout, timerAction } from "../../store/mainSlice";
import { Link, Route, useHistory } from "react-router-dom";
import Modal from "../UI/Modal";
import Card from "../UI/Card/Card";
import PromptModal from "../Prompt/PromptModal";
import { useRef, useState } from "react";
import AudioLibrary from "../Audio/AudioLibrary";
import TimerLogs from "./TimerLogs";

const TimerActions = () => {
  const audioEnableRef = useRef();
  const [callAudio, setCallAudio] = useState(false);
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
    setCallAudio(true);
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
      <Route path="/timer/logs">
        <TimerLogs />
      </Route>
      <div className={styles["timer__actions"]}>
        <Link to="/timer/exit">
          <Button length="circle" className={styles["action__item"]} color="red-fill">
            {Icons["close"]}
          </Button>
        </Link>
        <Link to="/timer/logs">
          <Button length="circle" className={styles["action__item"]} color="yellow-fill">
            {Icons["logs"]}
          </Button>
        </Link>
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
        <AudioLibrary audioLinker={callAudio} />
      </div>
    </>
  );
};

export default TimerActions;
