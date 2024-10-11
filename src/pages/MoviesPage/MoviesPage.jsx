import { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState("");

	const handleSearch = async () => {
		const response = await axios.get(
			`https://api.themoviedb.org/3/search/movie?query=${query}`,
			{
				headers: {
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWU0YzI1MzZhNjU3ODlhZWU3M2NkOGU2MmQ4ZDg4MSIsIm5iZiI6MTcyODU0MzE3OS41MTU4ODIsInN1YiI6IjY3MDNlNzAxN2NmZWE2ZjIwMjczZjBhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2rWWn7OInfpJaLPICsgNSiq5ax7g_LCfCFmrY0JTQuo",
				},
			}
		);
		setMovies(response.data.results);
	};

	return (
		<div className={s.moviesPage}>
			<input
				type="text"
				value={query}
				className={s.searchInput}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button className={s.searchButton} onClick={handleSearch}>
				Search
			</button>
			<MovieList movies={movies} />
		</div>
	);
};

export default MoviesPage;
