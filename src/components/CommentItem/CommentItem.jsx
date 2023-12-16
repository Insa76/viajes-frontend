import "./commentItem.css";

import { useContext, useEffect, useRef, useState, useId } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import { HiOutlineTrash } from "react-icons/hi";

import TopBar from "../../components/NavBar/Nav";

const ComentItem = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { auth } = useContext(AuthContext);
  const formRef = useRef(null);
  const authorRef = useId();
  const nameRef = useId();

  const getPost = () => {
    fetch(`${API_URL}/post/${postId}`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => {
        if (res.status !== 200) return alert("Error getting post");

        return res.json();
      })
      .then((data) => {
        setPost(data);
      });
  };

  useEffect(() => {
    getPost();
  }, [postId, auth]);

  const handleDeleteComent = (comentId) => {
    fetch(`${API_URL}/coments/${postId}/${comentId}`, {
      method: "DELETE",
      headers: {
        Authorization: auth.token,
      },
    }).then((res) => {
      if (!res.ok) return alert("Error deleting comment");
      getPost();
    });
  };

  const handleCreateNewComent = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch(`${API_URL}/coments/${postId}`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        description: formData.get("author"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    }).then((res) => {
      if (!res.ok) return alert("Error creating new comment");
      getPost();
    });

    formRef.current.reset();
  };

  if (!post) return <h1>Loading...</h1>;

  return (
    <div className="comment">
      <TopBar />
      <span className="commentTitle">New Comment</span>

      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleCreateNewComent}
        ref={formRef}
        className="commentForm"
      >
        <label htmlFor={nameRef}>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Coment name"
          className="commentInput"
        />
        <label htmlFor={authorRef}>Author:</label>
        <input
          type="text"
          name="author"
          placeholder="author"
          className="commentInput"
        />

        <button className="commentButton">Create</button>
      </form>

      {/* <h1>{post.title}</h1>
      {post.coments.map((coment) => {
        return (
          <div key={coment.id} className="commentFormGroup">
            <h4>{coment.name}</h4>
            <div className="d-flex   justify-content-between">
              <p>
                <i>{coment.description}</i> <br />
                {new Date(post.createdAt).toDateString()}
              </p>
              <button
                className="delete-button"
                onClick={() => handleDeleteComent(coment._id)}
                style={{ fontSize: "20px", color: "red" }}
              >
                <HiOutlineTrash />
              </button>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default ComentItem;
