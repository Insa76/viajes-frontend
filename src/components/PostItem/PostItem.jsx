import { Link, useParams } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useContext, useId, useState } from "react";
import DeletePostModel from "../DeletePostModel copy";
import DeleteComModel from "../DeleteComModel copy";
import { AuthContext } from "../../providers/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./postItem.css";

const PostItem = ({ coment, post, getPost, onClick }) => {
  const PF = "http://localhost:4000/images";

  const { postId } = useParams();
  const { comentId } = useParams();
  const modalId = useId();
  /* const { auth } = useContext(AuthContext); */
  const { auth, logout, login } = useContext(AuthContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <div
      key={post._id}
      className="post"
      /* onClick={(e) => {
        // stop propagation to avoid triggering the onClick of the parent
        e.stopPropagation();
        onClick();
      }} */
    >
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      {/* <img className="postImg" src={post.photo} alt={post.author.username} /> */}

      <div className="postInfo">
        <Link style={{ textDecoration: "none", color: "darkslategrey" }}>
          <span className="postTitle">{post.title}</span>
        </Link>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>

        <p className="postDesc">{post.desc}</p>
      </div>
      <div>
        {/*  if (logout) {
        
      } */}
        <Link
          to={`/newPost/${post._id}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ fontSize: "20px", color: "darkseagreen" }}
          className="icono"
        >
          <HiOutlinePencilAlt />
        </Link>
        <Link
          to={`/`}
          onClick={(e) => {
            e.stopPropagation(), handleShow;
          }}
          data-bs-toggle="modal"
          style={{ fontSize: "20px", color: "coral" }}
        >
          <HiOutlineTrash />
        </Link>

        <DeletePostModel
          getPost={getPost}
          modalId={modalId}
          postId={post._id}
        />
        <DeletePostModel show={show} handleClose={handleClose} />
        <div className="commentPost">
          <span className="title">
            <b>Comments:</b>
          </span>
          <Link to={`/newComents/${post._id}`}>
            <i className="icon">
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </i>
          </Link>
          {post.coments.map((coment) => {
            return (
              <div key={coment.id}>
                <h5>
                  <i>{coment.name}</i>
                </h5>
                <div className="postFormGroup">
                  <div className="commentGroup">
                    <i>{coment.description} </i>
                  </div>
                  <div className="commentGroup1">
                    {new Date(post.createdAt).toDateString()}
                  </div>
                  <div></div>
                  <Link
                    to={`/${post._id}/${coment._id}`}
                    /* onClick={(e) => {
                      e.stopPropagation();
                    }} */
                    onClick={(() => handleDeleteComent(coment._id), handleShow)}
                    data-bs-toggle="modal"
                    style={{ fontSize: "20px", color: "coral" }}
                  >
                    <HiOutlineTrash />
                  </Link>
                  <DeleteComModel
                    getPost={getPost}
                    modalId={modalId}
                    comentId={coment._id}
                  />
                </div>
                <hr size="8px" color="black" />
              </div>
            );
          })}
          <DeleteComModel show={show} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
