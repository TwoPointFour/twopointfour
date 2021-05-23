import Input from "./Input";
import styles from "./InputGroupMulti.module.css";

const InputGroupMulti = (props) => {
  return (
    <div className={styles["input__multi"]}>
      <h4 className={styles.title}>{props.title}</h4>
      <div className={styles["input__group"]}>
        <Input
          type={props.type}
          onChangeHandler={props.onChangeHandler}
          onTouchHandler={props.onTouchHandler}
          floatText={props.floatText}
        ></Input>
      </div>
    </div>
  );
};

export default InputGroupMulti;
