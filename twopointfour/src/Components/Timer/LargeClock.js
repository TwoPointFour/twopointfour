import { useSelector } from "react-redux";
import Icons from "../Assets/Icons";
import Digit from "../UI/Digit";
import styles from "./LargeClock.module.css";
import { Link } from "react-router-dom";

const LargeClock = (props) => {
  const minutesCounter = useSelector((state) => state.timer.smallTimeValue);
  const secondsCounter = useSelector((state) => state.timer.bigTimeValue);
  const timer = props.min ? minutesCounter : secondsCounter;
  return (
    <div className={`${styles.clock} ${props.className}`}>
      <Digit size="large">{props.min ? timer.tenMin : timer.tenSec}</Digit>
      <Digit size="large">{props.min ? timer.oneMin : timer.oneSec}</Digit>
      <Digit size="large">:</Digit>
      <Digit size="large">{props.min ? timer.tenSec : timer.tenMilli}</Digit>
      <Digit size="large">{props.min ? timer.oneSec : timer.oneMilli}</Digit>
      <Link to="/timer/tutorial/1">
        <span className={styles.icon}>{Icons["info"]}</span>
      </Link>
    </div>
  );
};

export default LargeClock;
