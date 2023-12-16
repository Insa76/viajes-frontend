import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useId, useRef, useState } from "react";
import { API_URL } from "../utils/consts";
import { Link } from "react-router-dom";

const DeleteComModel = ({ comentId, postId, getPost, show, handleClose }) => {
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
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Comment?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirm.....?</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-secondary "
            onClick={handleClose}
            ref={ref}
          >
            Close
          </Button>
          <Button
            className="btn btn-danger ms-2 "
            onClick={handleDelete}
            ref={ref}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteComModel;
