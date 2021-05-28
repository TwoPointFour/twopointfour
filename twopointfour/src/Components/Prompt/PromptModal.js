import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal";
import styles from "./PromptModal.module.css";

const PromptModal = (props) => {
  const history = useHistory();
  function gobackPrevious() {
    history.goBack();
  }

  const description = props.description.map((ele) => <p>{ele}</p>);
  function pageRedirect() {
    props.path && history.replace(props.path);
    props.saveHandler && props.saveHandler();
  }
  return (
    <Modal>
      <Card parentClassName={styles.prompt} color="white">
        <h1>{props.title}</h1>
        {description}
        <div className={styles["prompt__controls"]}>
          <Button length="medium" onClickHandler={gobackPrevious} color="gray-borderless">
            {props.cancel}
          </Button>
          {props.accept && (
            <Button
              onClickHandler={pageRedirect}
              length="medium"
              color={`${props.acceptColor}-borderless`}
            >
              {props.accept}
            </Button>
          )}
        </div>
      </Card>
    </Modal>
  );
};

export default PromptModal;
