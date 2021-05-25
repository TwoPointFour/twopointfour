import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={`${styles.card} ${props.parentClassName} ${styles[props.color]}`}>
      {props.children}
    </div>
  );
};

export default Card;
