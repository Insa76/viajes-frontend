import { useId, useRef } from "react";
import { API_URL } from "../utils/consts";
import { Link } from "react-router-dom";

const DeleteComModel = ({ comentId, postId, getPost }) => {
  const labelId = useId();
  const ref = useRef(null);

  const handleDelete = () => {
    // eliminar el comentario del post
    console.log("delete post", postId);
    fetch(`${API_URL}/coments/${postId}/${comentId}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status !== 200) return alert("Error deleting post");

      // refresh page
      ref.current.click();
      getPost();
    });
  };

  return (
    <div
      className="modal fade"
      id={"modal" + comentId}
      aria-labelledby={labelId}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-dark" id={labelId}>
              {labelId}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">Are you sure ?</div>
          <div className="modal-footer">
            <Link to="/">
              <button
                type="button"
                className="btn btn-secondary "
                data-bs-dismiss="modal"
                ref={ref}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger ms-2 "
                onClick={handleDelete}
                ref={ref}
              >
                Delete
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteComModel;
