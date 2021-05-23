import Input from "./Input";
import styles from "./InputGroup.module.css";

const InputGroup = (props) => {
  return (
    <div className={styles["input__group"]}>
      <h4>{props.title}</h4>
      <Input
        type={props.type}
        name={props.name}
        floatText={props.floatText}
        touched={props.touched}
        valid={props.valid}
        value={props.value}
        onChangeHandler={props.onChangeHandler}
        onTouchHandler={props.onTouchHandler}
        pattern={props.pattern}
      ></Input>
    </div>
  );
};

export default InputGroup;
