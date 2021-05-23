import { useSelector } from "react-redux";
import Digit from "../UI/Digit";
import styles from "./LargeClock.module.css";

const LargeClock = () => {
  const timer = useSelector((state) => state.timer.bigTimeValue);
  return (
    <div className={styles.clock}>
      <Digit size="large">{timer.tenSec}</Digit>
      <Digit size="large">{timer.oneSec}</Digit>
      <Digit size="large">:</Digit>
      <Digit size="large">{timer.tenMilli}</Digit>
      <Digit size="large">{timer.oneMilli}</Digit>
    </div>
  );
};

export default LargeClock;
