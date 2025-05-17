import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ margin: "1rem 0" }}>
      <Link to="/movies">Movies</Link>{" | "}
      <Link to="/tvshows">TV Shows</Link>
    </nav>
  );
}

export default Navbar;