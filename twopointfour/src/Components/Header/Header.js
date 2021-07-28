import Avatar from "../UI/Avatar";
import styles from "./Header.module.css";
import yihein from "../Assets/yihein.jpg";
import { useLocation } from "react-router";
import Icons from "../Assets/Icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  console.log("Header rendered!");
  const { pathname } = useLocation();
  const HeaderText = pathname
    .split("/")[1]
    .replace(pathname.split("/")[1][0], pathname.split("/")[1][0].toUpperCase());
  const dp = useSelector((state) => state.user.userProfile.dp);
  const coins = useSelector((state) => state.user.userProfile.coins);
  return (
    <nav className={styles.header}>
      <ul className={styles["header__list"]}>
        {/* <li className={styles.logo}>{Icons["logo"]}</li> */}
        <li>
          <Link to="/profile">
            <div className={styles["profile__li"]}>
              {dp ? (
                <Avatar size="small" url={dp} />
              ) : (
                <figure className={styles.profile}>{Icons["profile"]}</figure>
              )}
            </div>
          </Link>
        </li>
        <li>
          <h2>{HeaderText}</h2>
        </li>
        <li className={styles["shop__group"]}>
          <div className={styles["coins"]}>
            <div className={styles["coins__plus"]}>{Icons["plus"]}</div>
            <div className={styles["coins__number"]}>{coins}</div>
            <div className={styles["coins__icon"]}>{Icons["coin"]}</div>
          </div>
          <Link to="/shop">
            <div className={styles["shop__icon"]}>{Icons["shop"]}</div>
          </Link>
          <Link to="/timer">
            <div className={styles["shop__icon"]}>{Icons["shop"]}</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
