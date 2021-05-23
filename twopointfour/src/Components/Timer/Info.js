import InfoItem from "./InfoItem";
import styles from "./Info.module.css";
import { useSelector } from "react-redux";

const Info = () => {
  const set = useSelector((state) => state.timer.setCount);
  const distance = useSelector((state) => state.timer.distance);
  console.log(distance);
  return (
    <div className={styles.info}>
      <InfoItem title="Set" value={set} />
      <InfoItem title="Distance" value={`${distance}m`} />
    </div>
  );
};

export default Info;
