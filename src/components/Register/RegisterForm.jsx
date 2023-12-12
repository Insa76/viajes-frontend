import "./register.css";

import { useId, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/consts";
import TopBar from "../NavBar/Nav";

function RegisterForm() {
  const ref = useRef(null);

  const avatarRef = useId();
  const emailRef = useId();
  const usernameRef = useId();
  const passwordRef = useId();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { avatar, email, username, password } = e.target.elements;

    const formData = new FormData(e.target);

    const avatar = formData.get("avatar");
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");

    const user = {
      avatar,
      email,
      username,
      password,
    };

    const req = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.status !== 201) return alert("Error al registrar usuario");
    ref.current.reset();

    navigate("/login");
  };

  return (
    <div className="register">
      <TopBar />

      <span className="registerTitle">Register</span>
      <form onSubmit={handleSubmit} ref={ref} className="registerForm">
        {/* <label htmlFor={avatarRef}>Avatar:</label>
        <input type="url" placeholder="www.my-avatar.com" name="avatar" /> */}

        <label htmlFor={emailRef}>Email:</label>
        <input
          type="email"
          placeholder="Enter your email..."
          name="email"
          className="registerInput"
        />

        <label htmlFor={usernameRef}>UserName:</label>
        <input
          type="text"
          placeholder="Enter your username..."
          name="username"
          className="registerInput"
        />

        <label htmlFor={passwordRef}>Password:</label>
        <input
          type="password"
          placeholder="Enter your password..."
          name="password"
          className="registerInput"
        />

        <button className="registerButton">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
