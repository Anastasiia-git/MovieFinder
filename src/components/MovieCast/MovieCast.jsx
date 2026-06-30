import { getCast, IMG_BASE_URL } from "../../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getCast(movieId);
        setActors(data?.cast ?? []);
      } catch (error) {
        console.error(error);
        setError("Failed to load cast information.");
      } finally {
        setLoading(false);
      }
    };

    getMovieCast();
  }, [movieId]);

  if (loading) {
    return <p className={s.empty}>Loading cast...</p>;
  }

  if (error) {
    return <p className={s.empty}>{error}</p>;
  }

  if (actors.length === 0) {
    return <p className={s.empty}>Sorry, but we do not have any information.</p>;
  }

  return (
    <ul className={s.grid}>
      {actors.map((actor) => {
        return (
          <li key={actor.id} className={s.card}>
            <div className={s.avatarWrap}>
              {actor.profile_path ? (
                <img
                  className={s.img}
                  src={`${IMG_BASE_URL}${actor.profile_path}`}
                  alt={actor.name}
                  loading="lazy"
                />
              ) : (
                <div className={s.noPhoto}>
                  <span>{actor.name?.charAt(0)}</span>
                </div>
              )}
            </div>

            <p className={s.name} title={actor.name}>
              {actor.name}
            </p>

            {actor.character && (
              <p className={s.character} title={actor.character}>
                {actor.character}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default MovieCast;
