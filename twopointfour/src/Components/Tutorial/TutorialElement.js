import { Link, Route } from "react-router-dom";
import Icons from "../Assets/Icons";
import Button from "../UI/Button";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal";
import styles from "./TutorialElement.module.css";

const TutorialElement = (props) => {
  console.log(props.content.path);
  const content = props.content.main.map((ele) => {
    return (
      <div>
        {ele.subtitle && <h5>{ele.subtitle}</h5>}
        <p>{ele.text}</p>
      </div>
    );
  });

  const controls = props.content.buttons.map((ele) => {
    return (
      <Link to={ele.link}>
        <Button color={`${ele.color}-borderless`} length="medium">
          {ele.text}
        </Button>
      </Link>
    );
  });
  return (
    <Route path={props.content.path}>
      <Modal>
        <Card parentClassName={styles.tutorial} color="white">
          <section className={styles.section}>
            <h4>{props.content.title}</h4>
            <Link to="/timer">
              <span className={styles["tutorial__close"]}>{Icons["close"]}</span>
            </Link>
          </section>
          {props.content.img && (
            <img className={styles["tutorial__img"]} src={props.content.img}></img>
          )}
          {content}
          <div className={styles["tutorial__controls"]}>{controls}</div>
        </Card>
      </Modal>
    </Route>
  );
};

export default TutorialElement;
