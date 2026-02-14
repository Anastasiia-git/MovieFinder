import { getReviews } from "../../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        setLoading(true);
        const data = await getReviews(movieId);
        setReviews(data?.results ?? []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMovieReviews();
  }, [movieId]);

  if (loading) {
    return <p className={s.message}>Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return (
      <p className={s.message}>
        Sorry, but we don't have any reviews for this movie.
      </p>
    );
  }

  return (
    <ul className={s.list}>
      {reviews.map((review) => (
        <li key={review.id} className={s.card}>
          <div className={s.header}>
            <span className={s.avatar}>
              {review.author?.charAt(0).toUpperCase()}
            </span>
            <p className={s.author}>{review.author}</p>
          </div>

          <p className={s.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
