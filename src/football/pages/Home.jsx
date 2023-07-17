import { useEffect, useState } from "react";
import { instance } from "../../api/instance";
import { errorAlert } from "../../components/Alerts";
import { LinearProgress } from "@mui/material";
import { CardPartido } from "../components/CardPartido";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { routes } from "../../helpers/routes";
import { useAuth } from "../../auth/hooks/useAuth";

function Home() {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  const getPartidos = () => {
    instance
      .get("/partidos")
      .then((res) => setPartidos(res.data.data))
      .catch((err) => errorAlert("Error", err.response.data.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => getPartidos(), []);

  const actionCrear = () => {
    navigate(routes.partidos.create);
  };

  const renderPartidos = () => {
    return partidos.map((partido) => {
      return <CardPartido key={partido.codigo} partido={partido} getPartidos={getPartidos} />;
    });
  };

  if (loading) return <LinearProgress />;

  return (
    <section className="section-home">
      <h1>Futbol Web App</h1>
      {isLogin() && (
        <button className="button-crear" onClick={actionCrear}>
          Crear un partido
        </button>
      )}
      <div className="container-partidos">{renderPartidos()}</div>
    </section>
  );
}

export default Home;
