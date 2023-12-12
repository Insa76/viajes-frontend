import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

const NavbarHome = () => {
  const { auth, logout, login } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/register">
                Register
              </Link>
            </li>

            {auth ? (
              <div className="d-inline-flex">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Post
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </div>
            ) : (
              <li className="nav-item">
                <Link className="nav-link active" to="/login" onClick={login}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
