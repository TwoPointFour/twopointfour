import Avatar from "../UI/Avatar";
import styles from "./Header.module.css";
import yihein from "../Assets/yihein.jpg";
import { useLocation } from "react-router";
import Icons from "../Assets/Icons";
import { Link } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const HeaderText = pathname.split("/")[1].toUpperCase();
  return (
    <nav className={styles.header}>
      <ul className={styles["header__list"]}>
        <li>
          <Avatar>{Icons["logo"]}</Avatar>
        </li>
        <li>
          <h2>{HeaderText}</h2>
        </li>
        <Link to="/profile">
          <li className={styles.profile}>{Icons["profile"]}</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Header;
