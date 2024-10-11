import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => (
	<div className={s.notFoundPage}>
		<h1 className={s.title}>404 - Not Found</h1>
		<Link to="/" className={s.link}>
			Go back to Home
		</Link>
	</div>
);

export default NotFoundPage;
