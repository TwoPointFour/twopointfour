import Avatar from "../UI/Avatar";
import styles from "./Header.module.css";
import logoIcon from "../Assets/icon_x144.png";
import yihein from "../Assets/yihein.jpg";
import { useLocation } from "react-router";

const Header = () => {
  const { pathname } = useLocation();
  const HeaderText = pathname
    .slice(1)
    .replace(pathname.slice(1)[0], pathname.slice(1)[0].toUpperCase());
  console.log(HeaderText);
  return (
    <nav className={styles.header}>
      <ul className={styles["header__list"]}>
        <li>
          <Avatar>
            <img src={logoIcon}></img>
          </Avatar>
        </li>
        <li>
          <h2>{HeaderText}</h2>
        </li>
        <li>
          <Avatar>
            <img src={yihein}></img>
          </Avatar>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
