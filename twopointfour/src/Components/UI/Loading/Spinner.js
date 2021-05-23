import Card from "../Card";
import styles from "./Spinner.module.css";

const Spinner = (props) => {
  return <div className={`${styles.spinner} ${styles[props.size]}`}></div>;
};

export default Spinner;
