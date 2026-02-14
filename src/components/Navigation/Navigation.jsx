import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  const setActiveClass = ({ isActive }) => clsx(s.link, isActive && s.active);

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.brand}>
          <div className={s.logo}>🎬 MovieFinder</div>
          <p className={s.tagline}>
            Search movies fast. Save time. Watch better.
          </p>
        </div>

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
