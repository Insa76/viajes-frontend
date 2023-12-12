import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import RegisterForm from "./components/Register/RegisterForm";
import LoginForm from "./components/Login/LoginForm";
import NotFoundPage from "../src/pages/Page404/404Page";
import PostPage from "./pages/PostPage/PostPage";
import PrivateRoutes from "./components/PrivateRoutes";
import NewPost from "../src/components/NewPost/NewPost";
import NewComment from "./pages/Comments/CommentsPage";
import CommentsPage from "./pages/Comments/CommentsPage";
import PostHome from "./pages/PostHome";

function AppRouter() {
  return (
    <Routes>
      {/* Rutas Protegidas */}
      <Route element={<PrivateRoutes />}>
        <Route path="/newPost" element={<NewPost />} />
        <Route path="/post/comment" element={<NewComment />} />
        <Route path="/post/:postId" element={<CommentsPage />} />
      </Route>

      {/* Rutas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/posthome" element={<PostHome />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default AppRouter;
