import { useSelector } from "react-redux";
import Digit from "../UI/Digit";
import styles from "./SmallClock.module.css";

const SmallClock = (props) => {
  const timer = useSelector((state) => state.timer.smallTimeValue);
  const rest = useSelector((state) => state.timer.rest);
  return (
    <div className={`${props.className} ${styles.clock} ${rest ? styles.rest : ""}`}>
      <Digit size="small">{timer.tenMin}</Digit>
      <Digit size="small">{timer.oneMin}</Digit>
      <Digit size="small">:</Digit>
      <Digit size="small">{timer.tenSec}</Digit>
      <Digit size="small">{timer.oneSec}</Digit>
    </div>
  );
};

export default SmallClock;
