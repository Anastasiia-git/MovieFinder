import { BeatLoader } from "react-spinners";
import clsx from "clsx";
import s from "./Loader.module.css";

function Loader({
  variant = "page",
  size,
  color = "#2dd4bf",
  className,
}) {
  const isPage = variant === "page";
  const loaderSize = size ?? (isPage ? 12 : 10);

  return (
    <div
      className={clsx(isPage ? s.backdrop : s.overlay, className)}
      role="status"
      aria-label="Loading"
    >
      {isPage ? (
        <div className={s.card}>
          <BeatLoader size={loaderSize} color={color} />
        </div>
      ) : (
        <BeatLoader size={loaderSize} color={color} />
      )}
    </div>
  );
}

export default Loader;
