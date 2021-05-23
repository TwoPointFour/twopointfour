import { Link } from "react-router-dom";
import Button from "./Button";
import Card from "./Card";
import styles from "./CardNotFound.module.css";

const CardNotFound = (props) => {
  return (
    <Card color="white" parentClassName={styles["notFound"]}>
      <h3 className={styles.title}>{props.title}</h3>
      <p className={styles.description}>{props.description}</p>
      <Link to={props.path}>
        <Button className={styles.shift} length="long" color="yellow-fill">
          <h4>{props.button}</h4>
        </Button>
      </Link>
    </Card>
  );
};

export default CardNotFound;
