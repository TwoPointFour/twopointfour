import Spinner from "./Spinner";
import styles from "./LoadingPage.module.css";

const LoadingPage = () => {
  return (
    <div className={styles["loading"]}>
      <Spinner size="large"></Spinner>
    </div>
  );
};

export default LoadingPage;
