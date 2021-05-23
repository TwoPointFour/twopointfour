import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClickHandler}
      className={`${styles.button} ${styles[props.length]} ${styles[props.color]} ${
        styles[props.variation]
      } ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
