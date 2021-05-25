import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UIAction } from "../../../store/mainSlice";
import Icons from "../../Assets/Icons";
import Button from "../Button";
import Card from "../Card/Card";
import Modal from "../Modal";
import styles from "./LoadingModal.module.css";
import Spinner from "./Spinner";

const LoadingModal = () => {
  const modalInfo = useSelector((state) => state.ui.modal);
  const dispatch = useDispatch();
  return (
    <Modal>
      <Card color="white">
        <div className={styles.modal}>
          {modalInfo.status === "loading" && <Spinner size="large"></Spinner>}
          {modalInfo.status === "success" && (
            <figure className={styles.icon}>{Icons["success"]}</figure>
          )}
          <h3 className={styles.title}>{modalInfo.title}</h3>
          <p className={styles.description}>{modalInfo.description}</p>
          {modalInfo.status === "success" && (
            <Link to={modalInfo.buttonPath}>
              <Button
                onClickHandler={() => {
                  dispatch(UIAction.showModal(false));
                }}
                length="long"
                color="yellow-fill"
              >
                {modalInfo.buttonText}
              </Button>
            </Link>
          )}
        </div>
      </Card>
    </Modal>
  );
};

export default LoadingModal;
