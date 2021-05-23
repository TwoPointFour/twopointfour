import styles from "./InfoItem.module.css";

const InfoItem = (props) => {
  return (
    <div className={styles["info__item"]}>
      <h3>{props.title}</h3>
      <h3 className={styles.value}>{props.value}</h3>
    </div>
  );
};

export default InfoItem;
