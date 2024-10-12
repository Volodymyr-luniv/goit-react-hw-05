import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";
import placeholder from "../../assets/images/photo-film.jpg";

const MovieList = ({ movies }) => {
	const location = useLocation();

	return (
		<ul className={s.movieList}>
			{movies.map((movie) => (
				<li key={movie.id} className={s.movieItem}>
					<Link
						to={`/movies/${movie.id}`}
						state={{ from: location }}
						className={s.movieLink}
					>
						<img
							src={
								movie.poster_path
									? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
									: placeholder
							}
							alt={movie.title}
							className={s.movieImage}
						/>
						<div className={s.movieTitle}>{movie.title}</div>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default MovieList;
