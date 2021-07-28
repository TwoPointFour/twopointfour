import Icons from "../../Assets/Icons";
import ActionButton from "./ActionButton";
import styles from "./SaveActionButton.module.css";

const SaveActionButton = (props) => {
  return (
    <ActionButton onClickHandler={props.onClickHandler} type={styles.save}>
      <span className={styles.icon}>{Icons["save"]}</span> {props.text || "Save"}
    </ActionButton>
  );
};

export default SaveActionButton;
