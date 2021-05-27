import NavItem from "./NavItem";
import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <NavLink to="/logs" activeClassName={styles.active}>
            <NavItem variation="normal" name="logs" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/run" activeClassName={styles.active}>
            <NavItem variation="pop" name="run" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics" activeClassName={styles.active}>
            <NavItem variation="normal" name="analytics" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
