import { Link } from "react-router-dom";
import "./404Page.css";

function NotFoundPage() {
  return (
    <div className="notFound">
      <h1>404</h1>
      <h3>Not found</h3>
      <Link to="/">GO TO HOME</Link>
    </div>
  );
}
export default NotFoundPage;
