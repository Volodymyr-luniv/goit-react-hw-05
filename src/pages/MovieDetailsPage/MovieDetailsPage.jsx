import { useState, useEffect, useRef } from "react";
import {
	Link,
	useParams,
	Outlet,
	useNavigate,
	useLocation,
} from "react-router-dom";
import axios from "axios";
import s from "./MovieDetailsPage.module.css";
import placeholder from "../../assets/images/photo-film.jpg";

const MovieDetailsPage = () => {
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const location = useLocation();

	const prevLocationRef = useRef(location.state?.from || "/");

	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/${movieId}`,
					{
						headers: {
							Authorization:
								"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWU0YzI1MzZhNjU3ODlhZWU3M2NkOGU2MmQ4ZDg4MSIsIm5iZiI6MTcyODU0MzE3OS41MTU4ODIsInN1YiI6IjY3MDNlNzAxN2NmZWE2ZjIwMjczZjBhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2rWWn7OInfpJaLPICsgNSiq5ax7g_LCfCFmrY0JTQuo",
						},
					}
				);
				setMovie(response.data);
			} catch (err) {
				setError(err);
			}
		};

		fetchMovieDetails();
	}, [movieId]);

	const goBack = () => navigate(prevLocationRef.current);

	if (error) return <p className={s.error}>Error: {error.message}</p>;
	if (!movie) return <p className={s.loading}>Loading...</p>;

	return (
		<div className={s.movieDetails}>
			<button className={s.backButton} onClick={goBack}>
				Go back
			</button>
			<h1 className={s.movieTitle}>{movie.title}</h1>
			<img
				className={s.moviePoster}
				src={
					movie.poster_path
						? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
						: placeholder
				}
				alt={movie.title}
			/>
			<p className={s.movieOverview}>{movie.overview}</p>
			<div className={s.links}>
				<Link to="cast" className={s.link}>
					Cast
				</Link>
				<Link to="reviews" className={s.link}>
					Reviews
				</Link>
			</div>
			<Outlet />
		</div>
	);
};

export default MovieDetailsPage;
