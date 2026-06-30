import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        🍕 Pizza Delivery
      </Link>

      <div>
        <Link className="btn btn-outline-light me-2" to="/">
          Home
        </Link>

        <Link className="btn btn-outline-light me-2" to="/cart">
          Cart
        </Link>

        <Link className="btn btn-outline-light me-2" to="/orders">
          Orders
        </Link>

        <Link className="btn btn-outline-light me-2" to="/login">
          Login
        </Link>

        <Link className="btn btn-warning" to="/register">
          Register
        </Link>
        <Link className="btn btn-outline-light me-2" to="/admin">
  Admin
</Link>
<button
  className="btn btn-danger"
  onClick={handleLogout}
>
  Logout
</button>
      </div>
    </nav>
  );
}
const handleLogout = () => {

  localStorage.removeItem("token");

  window.location.href = "/login";

};

export default Navbar;