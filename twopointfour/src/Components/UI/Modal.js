import styles from "./Modal.module.css";
import ModalBackdrop from "./ModalBackdrop";

const Modal = (props) => {
  return (
    <>
      <div className={styles.modal}>{props.children}</div>
      <ModalBackdrop />
    </>
  );
};

export default Modal;
