/* import "./home.css"; */

import PostPage from "../PostPage/PostPage";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import HeaderApp from "../../components/HeaderApp/HeaderApp";
import TopBar from "../../components/NavBar/Nav";

function HomePage() {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <TopBar />

      <div>
        <HeaderApp />
      </div>

      {auth ? <PostPage /> : null}
    </div>
  );
}
export default HomePage;
