import { Link, useParams } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useContext, useId } from "react";
import DeletePostModel from "../DeletePostModel";
import DeleteComModel from "../DeleteComModel";
import { AuthContext } from "../../providers/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./postItem.css";

const PostItem = ({ coment, post, getPost, onClick }) => {
  const { postId } = useParams();
  const { comentId } = useParams();
  const modalId = useId();
  const { auth } = useContext(AuthContext);

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
      onClick={(e) => {
        // stop propagation to avoid triggering the onClick of the parent
        e.stopPropagation();
        onClick();
      }}
    >
      {post.photo && <img className="postImg" src={post.photo} alt="" />}
      {/* <img className="postImg" src={post.photo} alt={post.author.username} /> */}

      <div className="postInfo">
        <Link
          to={`/post/${post._id}`}
          style={{ textDecoration: "none", color: "darkslategrey" }}
        >
          <span className="postTitle">{post.title}</span>
        </Link>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <div>
        <p className="postDesc">{post.desc}</p>

        <Link
          to="/newPost"
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ fontSize: "20px", color: "darkseagreen" }}
          className="icono"
        >
          <HiOutlinePencilAlt />
        </Link>
        <Link
          onClick={(e) => {
            e.stopPropagation();
          }}
          data-bs-toggle="modal"
          data-bs-target={"#modal" + post._id}
          style={{ fontSize: "20px", color: "coral" }}
        >
          <HiOutlineTrash />
        </Link>

        <DeletePostModel
          getPost={getPost}
          modalId={modalId}
          postId={post._id}
        />

        <div className="commentPost">
          <span className="title">
            <b>Comments:</b>
          </span>

          <i className="icon">
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </i>

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
                    /* onClick={(e) => {
                      e.stopPropagation();
                    }} */
                    onClick={() => handleDeleteComent(coment._id)}
                    data-bs-toggle="modal"
                    data-bs-target={"#modal" + coment._id}
                    style={{ fontSize: "20px", color: "coral" }}
                  >
                    <HiOutlineTrash />
                  </Link>
                  <DeleteComModel
                    getPost={getPost}
                    modalId={modalId}
                    comentId={coment._id}
                  />

                  {/* { <button
                    className="delete-button "
                    onClick={() => handleDeleteComent(coment._id)}
                    style={{ fontSize: "18px", color: "red" }}
                  >
                    <HiOutlineTrash />
                  </button>}  */}
                </div>
                <hr size="8px" color="black" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
