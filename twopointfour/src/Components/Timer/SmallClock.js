import { useSelector } from "react-redux";
import { msToMinSArray } from "../Helper/Complementary";
import Digit from "../UI/Digit";
import styles from "./SmallClock.module.css";

const SmallClock = (props) => {
  const timeElapsed = useSelector((state) => state.timer.setTimeElapsed);
  const timeLeft = useSelector((state) => state.timer.setTime);
  const clockValues = msToMinSArray(props.type === "elapsed" ? timeElapsed : timeLeft);
  // console.log(clockValues);
  const rest = useSelector((state) => state.timer.rest);
  return (
    <div className={`${props.className} ${styles.clock} ${rest ? styles.rest : ""}`}>
      <Digit size="small">{clockValues[0]}</Digit>
      <Digit size="small">{clockValues[1]}</Digit>
      <Digit size="small">:</Digit>
      <Digit size="small">{clockValues[2]}</Digit>
      <Digit size="small">{clockValues[3]}</Digit>
    </div>
  );
};

export default SmallClock;
