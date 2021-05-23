import styles from "./Chip.module.css";

const Chip = (props) => {
  return <div className={`${styles.chip} ${styles[props.color]}`}>{props.children}</div>;
};

export default Chip;
