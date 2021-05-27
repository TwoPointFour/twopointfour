import styles from "./RadioLinks.module.css";
import { Link, useLocation } from "react-router-dom";

const RadioLinks = (props) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/").slice(1);
  return (
    <div className={styles["radio__wrapper"]}>
      <div className={styles.radio}>
        <div
          className={`${styles["radio__slider"]} ${
            pathArray.length == 2 && pathArray[1] == "community" && styles["community"]
          } ${pathArray.length == 1 && styles.empty}`}
        ></div>
        <Link to="/logs/mylogs">
          <button className={styles["radio__element"]}> My Logs</button>
        </Link>
        <Link to="/logs/community">
          <button className={styles["radio__element"]}> Community</button>
        </Link>
      </div>
    </div>
  );
};

export default RadioLinks;
