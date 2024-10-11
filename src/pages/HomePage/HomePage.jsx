import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

const HomePage = () => {
	const [movies, setMovies] = useState([]);
	// console.log();
	useEffect(() => {
		const fetchTrendingMovies = async () => {
			const response = await axios.get(
				"https://api.themoviedb.org/3/trending/movie/day",
				{
					headers: {
						Authorization:
							"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWU0YzI1MzZhNjU3ODlhZWU3M2NkOGU2MmQ4ZDg4MSIsIm5iZiI6MTcyODU0MzE3OS41MTU4ODIsInN1YiI6IjY3MDNlNzAxN2NmZWE2ZjIwMjczZjBhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2rWWn7OInfpJaLPICsgNSiq5ax7g_LCfCFmrY0JTQuo",
					},
				}
			);
			setMovies(response.data.results);
		};

		fetchTrendingMovies();
	}, []);

	return (
		<div className={s.homePage}>
			<h1 className={s.title}>Trending Movies</h1>
			<MovieList movies={movies} />
		</div>
	);
};

export default HomePage;
