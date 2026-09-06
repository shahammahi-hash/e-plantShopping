import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <h2>Paradise Nursery</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">Cart 🛒 ({cartCount})</Link>
      </div>
    </nav>
  );
}

export default Navbar;