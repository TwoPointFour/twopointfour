import { useSelector } from "react-redux";
import { msToMinSArray } from "../Helper/Complementary";
import Digit from "../UI/Digit";
import styles from "./SmallClock.module.css";

const SmallClock = (props) => {
  return (
    <div className={`${props.className} ${styles.clock} ${props.rest ? styles.rest : ""}`}>
      <Digit size="small">{props.timerData[0]}</Digit>
      <Digit size="small">{props.timerData[1]}</Digit>
      <Digit size="small">:</Digit>
      <Digit size="small">{props.timerData[2]}</Digit>
      <Digit size="small">{props.timerData[3]}</Digit>
    </div>
  );
};

export default SmallClock;
