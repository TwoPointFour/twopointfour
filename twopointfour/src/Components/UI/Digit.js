import styles from "./Digit.module.css";

const Digit = (props) => {
  return <div className={`${styles.digit} ${styles[props.size]}`}>{props.children}</div>;
};

export default Digit;
