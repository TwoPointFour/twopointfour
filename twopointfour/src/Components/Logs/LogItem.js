import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shareWorkout } from "../../store/mainSlice";
import Comments from "../Comments/Comments";
import { msToDate, msToMinS, msToS, msToTime } from "../Helper/Complementary";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import Card from "../UI/Card/Card";
import CardMini from "../UI/Card/CardMini";
import Chip from "../UI/Chip";
import Switch from "../UI/Input/Switch";
import MetricsMini from "../UI/Metrics/MetricsMini";
import Table from "../UI/Table";
import UIButton from "../UI/UIButton";
import styles from "./LogItem.module.css";

const LogItem = (props) => {
  const [toggleComment, setToggleComment] = useState(false);
  const dispatch = useDispatch();
  const workoutID = props.workoutData[0];
  const workoutInfo = props.workoutData[1];
  const comments = props.workoutData[1].social.comments;
  const workoutUser = props.workoutData[1].userProfile.uid;
  const userBadges = props.workoutData[1].userProfile.badges?.map((ele) => {
    return (
      <Chip color="green" size="small">
        {ele}
      </Chip>
    );
  });

  function onCommentClick() {
    setToggleComment((prev) => !prev);
  }

  function onShareClick(input) {
    console.log("share clicked!");
    console.log(input);
    const modifiedWorkoutInfo = { ...workoutInfo, social: { ...workoutInfo.social, share: input } };
    dispatch(shareWorkout(workoutID, modifiedWorkoutInfo, input));
  }

  const date = msToDate(props.workoutData[1].workout.date);

  const time = msToTime(props.workoutData[1].workout.date);

  const { distance, pace, rest, sets, timings } = props.workoutData[1].workout.parts[0];

  const paceSeconds = msToS(pace, 2);

  const targetSetTime = sets * pace;

  const tableData = Array.from({ length: sets }, (x, i) => i).map((ele, i) => {
    if (timings[i] <= targetSetTime) return [msToMinS(timings[i]), "✅"];
    if (timings[i] > targetSetTime) return [msToMinS(timings[i]), "😩"];
    if (i > timings.length - 1) return ["", "❌"];
  });

  const averageTime = timings.reduce((acc, ele, _, arr) => {
    return (acc += ele / arr.length);
  });

  return (
    <Card parentClassName={styles["logs__card"]} color="white">
      <div className={styles["logs__name"]}>
        <div className={styles["header__wrapper"]}>
          <Avatar size="medium" url={props.workoutData[1].userProfile.dp} />
          <div className={styles["logs__header"]}>
            <div className={styles["name__info"]}>
              <span className={styles.span}>{props.workoutData[1].userProfile.displayName}</span>
              <div className={styles.badges}>{userBadges}</div>
            </div>
            <div className={styles["logs__datetime"]}>
              <Chip color="gray" size="small">
                {date}
              </Chip>
              <Chip color="gray" size="small">
                {time}
              </Chip>
              {/* <Chip color="gray" size="small">
              Bukit Gombak
            </Chip> */}
            </div>
          </div>
        </div>
        <div className={styles["logs__share"]}>
          <span className={styles["logs__share-label"]}>Share</span>
          <Switch
            onChangeHandler={onShareClick}
            shareStatus={workoutInfo.social.share}
            workoutID={workoutID}
          ></Switch>
        </div>
      </div>
      <div className={styles["workout__info"]}>
        <CardMini>Sets {sets}</CardMini>
        <CardMini>{distance}m</CardMini>
        <CardMini>Rest {rest}s</CardMini>
        <CardMini>{paceSeconds}s / 100m</CardMini>
      </div>
      <div className={styles["workout__data"]}>
        <Table data={tableData} />
        <MetricsMini title="Feeling" units="Good" number="😊"></MetricsMini>
        <MetricsMini
          title="Target / set"
          units="min"
          number={msToMinS(targetSetTime)}
        ></MetricsMini>
        <MetricsMini title="Average / set" units="min" number={msToMinS(averageTime)}></MetricsMini>
      </div>
      <UIButton onClickHandler={onCommentClick} />
      {toggleComment && (
        <Comments workoutID={workoutID} workoutUser={workoutUser} commentData={comments} />
      )}
    </Card>
  );
};

export default LogItem;
