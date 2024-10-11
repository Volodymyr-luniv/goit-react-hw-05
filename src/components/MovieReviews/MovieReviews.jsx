import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import placeholder from "../../assets/images/photo-film.jpg";

const MovieReviews = () => {
	const { movieId } = useParams();
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const fetchReviews = async () => {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${movieId}/reviews`,
				{
					headers: {
						Authorization:
							"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWU0YzI1MzZhNjU3ODlhZWU3M2NkOGU2MmQ4ZDg4MSIsIm5iZiI6MTcyODU0MzE3OS41MTU4ODIsInN1YiI6IjY3MDNlNzAxN2NmZWE2ZjIwMjczZjBhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2rWWn7OInfpJaLPICsgNSiq5ax7g_LCfCFmrY0JTQuo",
					},
				}
			);
			setReviews(response.data.results);
		};

		fetchReviews();
	}, [movieId]);

	return (
		<div>
			<h2>Reviews</h2>
			<ul>
				{reviews.map((review) => (
					<li key={review.id}>
						<img
							src={
								review.author_details.avatar_path
									? `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
									: placeholder
							}
							alt={review.author}
							width="50"
						/>
						<h3>{review.author}</h3>
						<p>{review.content}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MovieReviews;
