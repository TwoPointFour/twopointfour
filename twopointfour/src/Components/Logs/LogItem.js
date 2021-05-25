import { useState } from "react";
import { useSelector } from "react-redux";
import Comments from "../Comments/Comments";
import { msToDate, msToMinS, msToS, msToTime } from "../Helper/Complementary";
import Avatar from "../UI/Avatar";
import Card from "../UI/Card/Card";
import CardMini from "../UI/Card/CardMini";
import Chip from "../UI/Chip";
import MetricsMini from "../UI/Metrics/MetricsMini";
import Table from "../UI/Table";
import UIButton from "../UI/UIButton";
import styles from "./LogItem.module.css";

const LogItem = (props) => {
  const [toggleComment, setToggleComment] = useState(false);
  const profileDp = useSelector((state) => state.user.userProfile.dp);
  const userBadges = props.workoutData.userProfile.badges.map((ele) => {
    return (
      <Chip color="green" size="small">
        {ele}
      </Chip>
    );
  });

  function onCommentClick() {
    console.log("Clicked!");
    setToggleComment((prev) => !prev);
  }

  const date = msToDate(props.workoutData.workout.date);

  const time = msToTime(props.workoutData.workout.date);

  const { distance, pace, rest, sets, timings } = props.workoutData.workout.parts[0];

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

  const comments = props.workoutData.comments;

  return (
    <Card parentClassName={styles["logs__card"]} color="white">
      <div className={styles["logs__name"]}>
        <Avatar size="medium" url={props.workoutData.userProfile.dp} />
        <div className={styles["logs__header"]}>
          <div className={styles["name__info"]}>
            <span className={styles.span}>{props.workoutData.userProfile.displayName}</span>
            <div className={styles.badges}>
              {userBadges}
              <Chip color="green" size="small">
                "hi"
              </Chip>
              <Chip color="green" size="small">
                "hi"
              </Chip>
              <Chip color="green" size="small">
                "hi"
              </Chip>
            </div>
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
      {toggleComment && <Comments commentData={comments} />}
    </Card>
  );
};

export default LogItem;
