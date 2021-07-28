import styles from "./ActionButton.module.css";

const ActionButton = (props) => {
  return (
    <button onClick={props.onClickHandler} className={`${styles.button} ${props.type}`}>
      {props.children}
    </button>
  );
};

export default ActionButton;
