import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <main className={s.page}>
      <p className={s.text}>We found nothing.</p>
      <Link className={s.scr} to="/">
        Return to the Home page
      </Link>
    </main>
  );
}

export default NotFoundPage;
