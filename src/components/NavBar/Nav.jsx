import { Link } from "react-router-dom";
import "./Nav.css";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faPinterestSquare,
  faTwitterSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";

function TopBar() {
  const { auth, logout, login } = useContext(AuthContext);
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon">
          <FontAwesomeIcon icon={faFacebookSquare}></FontAwesomeIcon>
        </i>
        <i className="topIcon ">
          <FontAwesomeIcon icon={faTwitterSquare}></FontAwesomeIcon>
        </i>
        <i className="topIcon ">
          <FontAwesomeIcon icon={faPinterestSquare}></FontAwesomeIcon>
        </i>
        <i className="topIcon ">
          <FontAwesomeIcon icon={faInstagramSquare}></FontAwesomeIcon>
        </i>
      </div>

      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="nav-link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="nav-link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="nav-link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="nav-link" to="/">
              POST
            </Link>
          </li>
        </ul>
      </div>

      <div className="topRight">
        {auth ? (
          <ul className="topList">
            <li className="topListItem">
              <Link className="nav-link " to="/" onClick={logout}>
                LOGOUT
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="nav-link" to="/login" onClick={login}>
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="nav-link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        {/* <i className="topSearchIcon fas fa-search"></i> */}
      </div>
    </div>
  );
}
export default TopBar;
