import { Link, NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  const setActiveClass = ({ isActive }) => clsx(s.link, isActive && s.active);

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <Link className={s.logo} to="/">
          <img className={s.logoIcon} src="/favicon.png" alt="" />
          <span>
            Movie<span>Finder</span>
          </span>
        </Link>

        <nav className={s.navLinks}>
          <NavLink className={setActiveClass} to="/">
            Home
          </NavLink>
          <NavLink className={setActiveClass} to="/movies">
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
