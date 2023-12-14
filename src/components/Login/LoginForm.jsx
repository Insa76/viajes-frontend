import { useId, useRef } from "react";
import { API_URL } from "../../utils/consts";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import TopBar from "../NavBar/Nav";
import "./Login.css";

function LoginForm() {
  const ref = useRef(null);
  const emailRef = useId();
  const passwordRef = useId();

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const user = {
      email,
      password,
    };

    const req = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (req.status !== 200) {
      ref.current.reset();
      return alert("Error al iniciar sesión");
    }

    const res = await req.json();

    login(res);

    ref.current.reset();

    navigate("/");
  };

  return (
    <div className="login">
      <TopBar />

      <span className="loginTitle">Login</span>
      <form onSubmit={handleSubmit} ref={ref} className="loginForm">
        <label htmlFor={emailRef}>Email:</label>
        <input
          type="email"
          placeholder="Enter your email..."
          name="email"
          id={emailRef}
          className="loginInput"
        />

        <label htmlFor={passwordRef}>Password:</label>
        <input
          type="password"
          placeholder="Enter your password..."
          name="password"
          id={passwordRef}
          className="loginInput"
        />

        <button className="loginButton">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
