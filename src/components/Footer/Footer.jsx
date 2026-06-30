import { Link } from "react-router-dom";
import s from "./Footer.module.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.about}>
          <Link className={s.logo} to="/">
            <img className={s.logoIcon} src="/favicon.png" alt="" />
            <span>
              Movie<span>Finder</span>
            </span>
          </Link>
          <p className={s.description}>
            Discover movies, explore cast details, reviews, trailers, and story
            snapshots in one clean place.
          </p>
        </div>

        <div className={s.meta}>
          <p>© {year} MovieFinder</p>
          <p>Movie data from TMDB. Trailers via YouTube when available.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
