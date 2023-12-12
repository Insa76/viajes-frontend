import styles from "../styles/Post.module.css";

import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import Post from "../components/PostH";
import Navbar from "../components/Navbar";
import PostPage from "./PostPage/PostPage";

function PostHome(posts) {
  const { auth } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <h1>My posts</h1>
      <main className={styles.section}>
        <Post />
      </main>
    </div>
  );
}
export default PostHome;
