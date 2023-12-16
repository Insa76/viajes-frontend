import "./newComent.css";
import { useParams } from "react-router-dom";
import { useContext, useId, useState, useRef } from "react";
import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import TopBar from "../NavBar/Nav";

const NewComent = () => {
  const { postId } = useParams();
  const ref = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    /* const username = formData.get("username");
    const user = {
      username,
    }; */

    if (!title.trim() && !description.trim()) return;

    try {
      fetch(`${API_URL}/coments/${postId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      }).then((res) => {
        if (res.status !== 201) return alert("Error creating comment");

        /* window.location.replace("/coments/" + res.data._id); */
      });
    } catch (err) {}
    navigate("/");
  };

  return (
    <div className="write">
      <TopBar />
      <span className="commentTitle">New Comment</span>
      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit}
        ref={ref}
        className="commentForm"
      >
        <label htmlFor={titleId}>Description:</label>
        <input
          type="text"
          name="name"
          placeholder="Create Comment"
          className="commentInput"
          id={titleId}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor={descriptionId}>Author:</label>
        <input
          type="text"
          name="author"
          placeholder="Name...."
          className="commentInput"
          id={descriptionId}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <button className="commentButton">Create</button>
      </form>
    </div>
  );
};

export default NewComent;
