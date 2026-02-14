import { getCast, IMG_BASE_URL } from "../../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "./MovieCast.module.css";

const FALLBACK_AVATAR = "https://via.placeholder.com/300x450?text=No+Photo";

function MovieCast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        const data = await getCast(movieId);
        setActors(data?.cast ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    getMovieCast();
  }, [movieId]);

  if (actors.length === 0) {
    return <p className={s.empty}>Sorry, but we don't have any information.</p>;
  }

  return (
    <ul className={s.grid}>
      {actors.map((actor) => {
        const imgSrc = actor.profile_path
          ? `${IMG_BASE_URL}${actor.profile_path}`
          : FALLBACK_AVATAR;

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
