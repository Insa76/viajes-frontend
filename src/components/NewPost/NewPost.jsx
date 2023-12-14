import "./NewPost.css";
import { useContext, useId, useState, useRef } from "react";
import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TopBar from "../NavBar/Nav";

const NewPost = ({ post }) => {
  const ref = useRef(null);
  const titleId = useId();
  const descId = useId();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const user = {
      username,
    };

    if (!title.trim() && !desc.trim()) return;

    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      /* try {
        fetch(`${API_URL}/upload`, data)
        .then((response) => response.JSON());
      } catch (err) {} */
    }

    try {
      fetch(`${API_URL}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
        body: JSON.stringify({ title: title.trim(), desc: desc.trim() }),
      }).then((res) => {
        if (res.status !== 201) return alert("Error creating post");

        window.location.replace("/post/" + res.data._id);
      });
    } catch (err) {}
  };

  return (
    <div className="write">
      <TopBar />

      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <div className="writeFormGroup">
        <label htmlFor="fileInput">
          <i className="writeIcon">
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </i>
        </label>

        <span className="newPostTitle">New Post</span>
      </div>

      <form onSubmit={handleSubmit} ref={ref} className="writeForm">
        <div className="writeFormGroup">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor={titleId}>Title:</label>
          <input
            placeholder="New Post"
            className="writeInput"
            type="text"
            id={titleId}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="writeFormGroup">
          <label htmlFor={descId}>Description:</label>
          <textarea
            placeholder="Tell your story..."
            id={descId}
            value={desc}
            type="text"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
          <button type="submit" className="writeSubmit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
