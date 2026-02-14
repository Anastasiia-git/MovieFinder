import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css"

function NotFoundPage() {
  return (
    <nav className={s.nav}>
      We found nothing 😢 Click{" "}
      <Link className={s.scr} to="/">
        here
      </Link>{" "}
      and return to the Home page
    </nav>
  );
}

export default NotFoundPage