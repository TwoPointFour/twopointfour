import styles from "./Chip.module.css";

const Chip = (props) => {
  return (
    <span className={`${styles.chip} ${styles[props.color]} ${styles[props.size]}`}>
      {props.children}
    </span>
  );
};

export default Chip;
