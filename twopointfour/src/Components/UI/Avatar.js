import styles from "./Avatar.module.css";

const Avatar = (props) => {
  return <img className={`${styles.avatar} ${styles[props.size]}`} src={props.url}></img>;
};

export default Avatar;
