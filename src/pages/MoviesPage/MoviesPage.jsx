import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
	const [movies, setMovies] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("query") || "";

	useEffect(() => {
		if (!query) return;

		const fetchMovies = async () => {
			try {
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
			} catch (error) {
				console.error("Failed to fetch movies", error);
			}
		};

		fetchMovies();
	}, [query]);

	const handleSearch = (e) => {
		e.preventDefault();
		if (query.trim()) {
			setSearchParams({ query });
		}
	};

	return (
		<div className={s.moviesPage}>
			<form onSubmit={handleSearch}>
				<input
					type="text"
					value={query}
					className={s.searchInput}
					onChange={(e) => setSearchParams({ query: e.target.value })}
				/>
				<button type="submit" className={s.searchButton}>
					Search
				</button>
			</form>
			<MovieList movies={movies} />
		</div>
	);
};

export default MoviesPage;
