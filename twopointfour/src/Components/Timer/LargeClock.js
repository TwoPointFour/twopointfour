import { useSelector } from "react-redux";
import Icons from "../Assets/Icons";
import Digit from "../UI/Digit";
import styles from "./LargeClock.module.css";
import { Link } from "react-router-dom";

const LargeClock = () => {
  const timer = useSelector((state) => state.timer.bigTimeValue);
  return (
    <div className={styles.clock}>
      <Digit size="large">{timer.tenSec}</Digit>
      <Digit size="large">{timer.oneSec}</Digit>
      <Digit size="large">:</Digit>
      <Digit size="large">{timer.tenMilli}</Digit>
      <Digit size="large">{timer.oneMilli}</Digit>
      <Link to="/timer/tutorial/1">
        <span className={styles.icon}>{Icons["info"]}</span>
      </Link>
    </div>
  );
};

export default LargeClock;
