import styles from "./NavItem.module.css";
import Icons from "../Assets/Icons";

const NavItem = (props) => {
  return (
    <button className={`${styles["nav__item"]} ${styles[props.variation]}`}>
      {Icons[props.name]}
    </button>
  );
};

export default NavItem;
