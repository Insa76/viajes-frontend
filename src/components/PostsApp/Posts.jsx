import { useEffect, useState } from "react";
import PostItem from "../PostItem/PostItem";
import { Link, useNavigate } from "react-router-dom";
import "./posts.css";

const Post = ({ posts, getPost }) => {
  // la información que NO vamos a modificar.
  const [search, setSearch] = useState("");
  const [filterPosts, setFilterPosts] = useState(posts);

  const navigate = useNavigate();

  useEffect(() => {
    const filtered = posts.filter((p) => {
      return p.title.toLowerCase().includes(search.toLowerCase());
    });

    setFilterPosts(filtered);
  }, [search, posts]);

  return (
    <div style={{ minWidth: "420px" }} className="posts">
      <Link to="/newPost" className="PostsCreate">
        Create Post
      </Link>
      <input
        type="search"
        className="search"
        placeholder="Search Post..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <>
        {filterPosts.map((post) => {
          return (
            <PostItem
              getPost={getPost}
              key={post._id}
              post={post}
              onClick={() => {
                navigate(`/newPost/${post._id}`);
              }}
            />
          );
        })}
      </>
    </div>
  );
};

export default Post;
