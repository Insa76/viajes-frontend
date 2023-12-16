import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import DeleteComModel from "../DeleteComModel";
import { AuthContext } from "../../providers/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CommentItem = (post, getPost) => {
  const { comentId } = useParams();
  const { postId } = useParams();
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
    <div className="commentPost">
      <span className="title">
        <b>Comments:</b>
      </span>
      <Link to={`${API_URL}/coments/${post._id}`}>
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
                /* onClick={(e) => {
                e.stopPropagation();
              }} */
                to={`${API_URL}/coments/${post._id}`}
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
            </div>
            <hr size="8px" color="black" />
          </div>
        );
      })}
    </div>
  );
};

export default CommentItem;
