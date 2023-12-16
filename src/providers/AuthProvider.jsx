import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(undefined);
  /* const [isLogged, setIsLogged] = useState(false); */

  const login = ({ user, token }) => {
    setAuth({ user, token });

    localStorage.setItem("token", token);

    localStorage.setItem("user", JSON.stringify(user));
    /* setIsLogged(true); */
  };

  const logout = () => {
    /* Cookies.remove("token");
    Cookies.remove("user"); */
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuth(null);
    /* setIsLogged(false); */
  };

  useEffect(() => {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      // si no tenemos alguno de los dos campos en el localStorage borramos todo
      if (!user || !token) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setAuth(null);
        return;
      }

      setAuth({ user, token });
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
