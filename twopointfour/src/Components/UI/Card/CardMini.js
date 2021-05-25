import styles from "./CardMini.module.css";

const CardMini = (props) => {
  return <div className={styles.card}>{props.children}</div>;
};

export default CardMini;
