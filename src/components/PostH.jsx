import { useEffect, useState } from "react";
import PostItem from "./PostItemH";
import { useNavigate } from "react-router-dom";

const Post = ({ posts, getPost }) => {
  // la información que NO vamos a modificar.
  const [search, setSearch] = useState("");
  const [filterPosts, setFilterPosts] = useState(posts);

  const navigate = useNavigate();

  /* useEffect(() => {
    const filtered = posts.filter((p) => {
      return p.title.toLowerCase().includes(search.toLowerCase());
    });

    setFilterPosts(filtered);
  }, [search, posts]);
 */
  return (
    <div style={{ minWidth: "420px" }}>
      <input
        type="search"
        className="form-control"
        placeholder="Search"
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
                navigate(`/post/${post._id}`);
              }}
            />
          );
        })}
      </>
    </div>
  );
};

export default Post;
