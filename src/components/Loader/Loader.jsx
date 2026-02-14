import { BeatLoader } from "react-spinners";
import s from "./Loader.module.css";

function Loader() {
  return (
    <div className={s.backdrop}>
      <div className={s.card}>
        <BeatLoader size={12} color="#c7d2fe" />
      </div>
    </div>
  );
}

export default Loader;
