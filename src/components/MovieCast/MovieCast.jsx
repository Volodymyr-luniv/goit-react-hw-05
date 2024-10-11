import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./MovieCast.module.css";

const MovieCast = () => {
	const { movieId } = useParams();
	const [cast, setCast] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCast = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/${movieId}/credits`,
					{
						headers: {
							Authorization:
								"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWU0YzI1MzZhNjU3ODlhZWU3M2NkOGU2MmQ4ZDg4MSIsIm5iZiI6MTcyODU0MzE3OS41MTU4ODIsInN1YiI6IjY3MDNlNzAxN2NmZWE2ZjIwMjczZjBhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2rWWn7OInfpJaLPICsgNSiq5ax7g_LCfCFmrY0JTQuo",
						},
					}
				);
				setCast(response.data.cast);
			} catch (err) {
				setError(err);
			}
		};

		fetchCast();
	}, [movieId]);

	if (error) return <p className={s.error}>Error: {error.message}</p>;
	if (!cast.length) return <p className={s.loading}>Loading...</p>;

	return (
		<div className={s.castContainer}>
			<h2 className={s.castTitle}>Cast</h2>
			<ul className={s.castList}>
				{cast.map((actor) => (
					<li key={actor.id} className={s.castItem}>
						<img
							className={s.actorImage}
							src={
								actor.profile_path
									? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
									: "path_to_default_image"
							}
							alt={actor.name}
						/>
						<p className={s.actorName}>{actor.name}</p>
						<p className={s.characterName}>{actor.character}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MovieCast;
