import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { Avatar } from "@mui/material";
import { useAuth } from "../auth/hooks/useAuth";
import { routes } from "../helpers/routes";

export function Nabvar() {
  const { isLogin, user, logout } = useAuth();
  const navigate = useNavigate();

  const renderAvatar = () => {
    if (isLogin()) {
      return (
        <Avatar
          sx={{ width: 50, height: 50, cursor: "pointer" }}
          src={user.image}
        />
      );
    }
    return (
      <Avatar
        sx={{ width: 50, height: 50, cursor: "pointer" }}
        onClick={() => navigate(routes.login)}
      />
    );
  };

  const renderButton = () => {
    if (isLogin()) {
      return <button className="logout" onClick={() => logout()}>Cerrar sesión</button>;
    }
    return <button onClick={() => navigate(routes.login)}>Iniciar sesión</button>;
  };

  return (
    <nav className="header">
      <div className="profile">
        {renderAvatar()}
      </div>
      <ul>
        <li>
          <NavLink to="/">Partidos</NavLink>
        </li>
        <li>
          <NavLink to="/equipos">Equipos</NavLink>
        </li>
        <li>
          <NavLink to="/presidentes">Presidentes</NavLink>
        </li>
        <li>
          <NavLink to="/jugadores">Jugadores</NavLink>
        </li>
      </ul>
      <div className="buttons">
        {renderButton()}
      </div>
    </nav>
  );
}
