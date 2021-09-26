import Digit from "../Digit";
import styles from "./DistanceGroup.module.css";
const DistanceGroup = (props) => {
  return (
    <div className={styles["distance__group"]}>
      <Digit size="large-free">{props.data}</Digit>
      <span>m</span>
    </div>
  );
};

export default DistanceGroup;
