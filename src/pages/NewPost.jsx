import { useContext, useId, useState } from "react";
import styles from "../styles/AuthForm.module.css";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";

const NewPost = () => {
  const titleId = useId();
  const descId = useId();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() && !desc.trim()) return;

    fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify({ title: title.trim(), desc: desc.trim() }),
    }).then((res) => {
      if (res.status !== 201) return alert("Error creating post");

      navigate("/");
    });
  };

  return (
    <div>
      <NavbarHome />
      <h2>Create a new Post</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor={titleId}>Title:</label>
          <input
            type="text"
            id={titleId}
            placeholder="New Post"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <label htmlFor={descId}>Description:</label>
          <input
            type="text"
            id={descId}
            placeholder="Description"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewPost;
