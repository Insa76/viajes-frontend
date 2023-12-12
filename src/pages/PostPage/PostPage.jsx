import styles from "../../styles/Post.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import Post from "../../components/PostsApp/Posts";

function PostPage() {
  const [posts, setPosts] = useState([]);

  const { auth } = useContext(AuthContext);

  const getPost = useCallback(() => {
    fetch(`${API_URL}/post`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, [auth.token]);

  useEffect(() => {
    getPost();
  }, [auth, getPost]);

  return (
    <div>
      <h1>Posts</h1>
      <main className={styles.section}>
        <Post getPost={getPost} posts={posts} />
      </main>
    </div>
  );
}
export default PostPage;
