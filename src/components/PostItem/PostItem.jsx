import { Link, useParams } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useContext, useId } from "react";
import DeletePostModel from "../DeletePostModel";
import DeleteComModel from "../DeleteComModel";
import { AuthContext } from "../../providers/AuthProvider";

import "./postItem.css";

const PostItem = ({ post, getPost, onClick }) => {
  const { postId } = useParams();
  const { auth } = useContext(AuthContext);
  const modalId = useId();

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
      <picture className="postImg">
        <img className="postImg" src={post.photo} alt={post.author.username} />
      </picture>
      <section className="postInfo">
        <span className="postTitle">{post.title}</span>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>

        <p className="postDesc">{post.desc}</p>

        <div>
          <Link style={{ fontSize: "20px", color: "green" }} className="icono">
            <HiOutlinePencilAlt />
          </Link>
          <Link
            onClick={(e) => {
              e.stopPropagation();
            }}
            data-bs-toggle="modal"
            data-bs-target={"#modal" + post._id}
            style={{ fontSize: "20px", color: "red" }}
          >
            <HiOutlineTrash />
          </Link>

          <DeletePostModel
            getPost={getPost}
            modalId={modalId}
            postId={post._id}
          />
        </div>

        <div className="commentPost">
          <label>
            <b>Comments:</b>
          </label>
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

                  <Link
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    data-bs-toggle="modal"
                    data-bs-target={"#modal" + post._id}
                    style={{ fontSize: "20px", color: "red" }}
                  >
                    <HiOutlineTrash />
                  </Link>

                  {/* <button
                    className="delete-button "
                    onClick={() => handleDeleteComent(coment._id)}
                    style={{ fontSize: "18px", color: "red" }}
                  >
                    <HiOutlineTrash />
                  </button> */}
                </div>
                <hr size="8px" color="black" />
              </div>
            );

            {
              /* <p>
              <span className="postTitle">{coment.name}</span>
              <b>{post.author.username}: </b>
              <span>{post.coments.length}</span>
            </p>; */
            }
          })}
          <DeleteComModel
            getPost={getPost}
            modalId={modalId}
            postId={post._id}
          />
        </div>
      </section>
    </div>
  );
};

export default PostItem;
