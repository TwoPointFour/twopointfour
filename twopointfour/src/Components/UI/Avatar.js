import styles from "./Avatar.module.css";

const Avatar = (props) => {
  return <figure className={styles.avatar}>{props.children}</figure>;
};

export default Avatar;
