import { React, createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../helpers/routes";
import { errorAlert } from "../../components/Alerts";
import { instance } from "../../api/instance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const login = async (email, password, fromLocation) => {
    try {
      const response = await instance.post("/users/login", {
        email,
        password,
      });
      setUser(response.data.data.user);
      localStorage.setItem("token", response.data.data.token);
      if (fromLocation) return navigate(fromLocation);
      navigate(routes.home);
    } catch (error) {
      errorAlert(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const signup = async ({ email, password, nombre, imagen }) => {
    try {
      const response = await instance.post(
        "/users/signup",
        {
          email,
          password,
          nombre,
          imagen,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser(response.data.data.user);
      localStorage.setItem("token", response.data.data.token);
      return navigate(routes.home);
    } catch (error) {
      errorAlert(error.response.data.message);
    }
  };

  const isLogin = () => !!user;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      instance.defaults.headers.common["Authorization"] = token;
      instance
        .get("/users/me")
        .then((response) => setUser(response.data.data))
        .catch((error) => console.log(error));
    }
  }, []);

  const contextValue = {
    user,
    login,
    logout,
    signup,
    isLogin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
