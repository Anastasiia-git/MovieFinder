import { BeatLoader } from "react-spinners";
import s from "./Loader.module.css";

function Loader({ loading }) {
  if (!loading) return null;

  return (
    <div className={s.backdrop} role="status" aria-live="polite">
      <div className={s.card}>
        <div className={s.glow} aria-hidden="true" />
        <BeatLoader size={12} color="#c7d2fe" />
        <p className={s.text}>Loading…</p>
      </div>
    </div>
  );
}

export default Loader;
