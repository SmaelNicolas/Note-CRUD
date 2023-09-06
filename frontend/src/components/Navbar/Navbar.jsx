import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
	const { pathname } = useLocation();

	return (
		<header>
			<nav className="nav">
				<Link to="/">
					<img className="nav--image" src="/assets/logo.png" />
				</Link>
				<Link className="nav--link" to="/create">
					+ Create Note
				</Link>
				<ul className="nav--ul">
					{pathname === "/" ? (
						<Link className="nav--link" to="/archived">
							Archived Notes
						</Link>
					) : (
						<Link className="nav--link" to="/">
							⬅ Back to Actives
						</Link>
					)}
				</ul>
			</nav>
		</header>
	);
};
