import Avatar from "../UI/Avatar";
import styles from "./Header.module.css";
import yihein from "../Assets/yihein.jpg";
import { useLocation } from "react-router";
import Icons from "../Assets/Icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { pathname } = useLocation();
  const HeaderText = pathname.split("/")[1].toUpperCase();
  const dp = useSelector((state) => state.user.userProfile.dp);
  return (
    <nav className={styles.header}>
      <ul className={styles["header__list"]}>
        <li className={styles.logo}>{Icons["logo"]}</li>
        <li>
          <h2>{HeaderText}</h2>
        </li>
        <Link to="/profile">
          <li>
            {dp ? (
              <Avatar size="medium" url={dp} />
            ) : (
              <figure className={styles.profile}>{Icons["profile"]}</figure>
            )}
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Header;
