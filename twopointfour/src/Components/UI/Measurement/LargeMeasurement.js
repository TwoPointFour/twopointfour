import { useSelector } from "react-redux";
import Icons from "../../Assets/Icons";
import Digit from "../../UI/Digit";
import styles from "./LargeMeasurement.module.css";
import { Link } from "react-router-dom";

const LargeMeasurement = (props) => {
  return <div className={`${styles.measurement} ${props.className}`}>{props.children}</div>;
};

export default LargeMeasurement;
