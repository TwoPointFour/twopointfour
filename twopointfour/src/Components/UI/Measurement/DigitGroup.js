import Digit from "../Digit";
import styles from "./DigitGroup.module.css";
const DigitGroup = (props) => {
  return (
    <>
      <Digit size="large">{props.data[0]}</Digit>
      <Digit size="large">{props.data[1]}</Digit>
      <Digit size="large">:</Digit>
      <Digit size="large">{props.data[2]}</Digit>
      <Digit size="large">{props.data[3]}</Digit>
    </>
  );
};

export default DigitGroup;
