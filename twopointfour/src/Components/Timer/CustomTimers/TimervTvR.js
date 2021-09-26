import GPS from "../../GPS/GPS";
import Map from "../../Map/Map";
import MetricsCard from "../../UI/Metrics/MetricsCard";
import styles from "./TimervTvR.module.css";
import SmallClock from "../../Timer/SmallClock";
import LargeMeasurement from "../../UI/Measurement/LargeMeasurement";
import DigitGroup from "../../UI/Measurement/DigitGroup";
import { useDispatch, useSelector } from "react-redux";
import { savevTvR, startvTvR, vTvRAction } from "../../../store/vTvRSlice";
import { msToMinS, msToMinSArray, msToSMsArray } from "../../Helper/Complementary";
import { useEffect, useState } from "react";
import StartActionButton from "../../UI/Button/StartActionButton";
import SplitActionButton from "../../UI/Button/SplitActionButton";
import PauseActionButton from "../../UI/Button/PauseActionButton";
import SaveActionButton from "../../UI/Button/SaveActionButton";
const TimervTvR = () => {
  const timerData = useSelector((state) => state.vTvR);
  const [timerActionButtons, setTimerActionButtons] = useState();
  const dispatch = useDispatch();

  function timerStartHandler() {
    dispatch(startvTvR());
  }
  function timerPauseHandler() {
    dispatch(vTvRAction.pauseTimer(true));
  }
  function timerSplitHandler() {
    dispatch(vTvRAction.splitTimer(timerData.setTimeElapsed));
  }
  function timerSaveHandler() {
    dispatch(savevTvR());
  }
  useEffect(() => {
    if (!timerData.timerStarted) {
      setTimerActionButtons(<StartActionButton onClickHandler={timerStartHandler} />);
    } else if (timerData.rest && timerData.pause) {
      setTimerActionButtons(
        <>
          <StartActionButton text="Resume" onClickHandler={timerStartHandler} />
          <SaveActionButton onClickHandler={timerSaveHandler} />
        </>
      );
    } else if (timerData.rest) {
      setTimerActionButtons(<PauseActionButton onClickHandler={timerPauseHandler} />);
    } else if (!timerData.pause) {
      setTimerActionButtons(
        <>
          <SplitActionButton onClickHandler={timerSplitHandler} />
          <PauseActionButton onClickHandler={timerPauseHandler} />
        </>
      );
    } else {
      setTimerActionButtons(
        <>
          <StartActionButton text="Resume" onClickHandler={timerStartHandler} />
          <SaveActionButton onClickHandler={timerSaveHandler} />
        </>
      );
    }
  }, [timerData.timerStarted, timerData.pause, timerData.rest]);

  useEffect(() => {
    const testWorkout = {
      id: "1002",
      workoutInfo: [
        {
          distance: 300,
          pace: 5000,
          sets: 9,
          restTime: 40000,
        },
      ],
      type: "interval",
      measurement: "distance",
      alpha: 1.0,
      week: 1,
      global_score: 1000.0,
      difficultyMultiplier: 1.0,
    };

    const testWorkoutInfo = {
      distance: 300,
      pace: 3000,
      sets: 9,
      setTime: 20000,
    };
    dispatch(vTvRAction.initialiseTimer(testWorkoutInfo));
  }, []);
  return (
    <div>
      <GPS timer="vTvR" />
      <Map timer="vTvR" />
      <div className={styles["timer__interface"]}>
        <div className={styles["clock__group"]}>
          <LargeMeasurement>
            <DigitGroup data={msToSMsArray(timerData.paceTime)} />
          </LargeMeasurement>
          <SmallClock
            timerData={msToMinSArray(timerData.setTime)}
            rest={timerData.rest}
            className={styles["small__clock"]}
          />
        </div>
        <div className={styles.metrics}>
          <div className={styles["timer__actions"]}>{timerActionButtons}</div>
          <MetricsCard
            title="Previous Set"
            id="previous_set"
            icon="pace"
            number={
              timerData.workoutTimings.slice(-1) && msToMinS(timerData.workoutTimings.slice(-1))
            }
            units="min"
            description={msToMinS(timerData.permPaceCount * timerData.permPaceTime)}
          ></MetricsCard>
          <MetricsCard
            id="set_count"
            title="Sets"
            number={timerData.setCount}
            units=""
          ></MetricsCard>
        </div>
      </div>
    </div>
  );
};

export default TimervTvR;
