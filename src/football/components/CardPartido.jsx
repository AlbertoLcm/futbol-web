import moment from "moment";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { routes } from "../../helpers/routes";
import "../styles/CardPartido.css";
import { errorAlert, successAlert } from "../../components/Alerts";
import { instance } from "../../api/instance";

export function CardPartido({ partido, getPartidos }) {
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  const formatDate = (date) => {
    return moment(date).format("LLLL");
  };

  const actionEdit = (codigo) => {
    navigate(routes.partidos.edit(codigo));
  };

  const actionDelete = async (codigo) => {
    try {
      await instance.delete(`/partidos/delete/${codigo}`);
      successAlert("Exito", "Partido eliminado correctamente");
      getPartidos();
      navigate(routes.home);
    } catch (error) {
      console.log(error);
      errorAlert("Error", error.response.data.message);
    }
  };

  const renderFunctions = () => {
    if (isLogin()) {
      return (
        <div className="buttons">
          <button
            className="button-edit"
            onClick={() => actionEdit(partido.codigo)}
          >
            ✏️
          </button>
          <button
            className="button-delete"
            onClick={() => actionDelete(partido.codigo)}
          >
            ❌
          </button>
        </div>
      );
    }
  };

  return (
    <article className="overflow">
      <section className="card-partido">
        <p className="fecha">{formatDate(partido.fecha)}</p>
        <div className="content">
          <div className="equipo">
            <div className="equipo-presidente">
              <p className="presidente">
                {partido.equipoLocal.presidenteNombre}
                {partido.equipoLocal.presidenteApellidos}
              </p>
              <img
                src={partido.equipoLocal.presidenteImage}
                alt={partido.equipoLocal.presidenteNombre}
                className="presidente-image"
              />
            </div>
            <div className="equipo-datos">
              <img
                src={partido.equipoLocal.image}
                alt={partido.equipoLocal.nombre}
              />
              <p className="nombre">{partido.equipoLocal.nombre}</p>
            </div>
          </div>

          <div className="versus">
            <p className="goles">{partido.equipoLocal.goles}</p>
            <p className="ft">FT</p>
            <p className="goles">{partido.equipoVisitante.goles}</p>
          </div>

          <div className="equipo">
            <div className="equipo-presidente">
              <img
                src={partido.equipoVisitante.presidenteImage}
                alt={partido.equipoVisitante.presidenteNombre}
                className="presidente-image"
              />
              <p className="presidente">
                {partido.equipoVisitante.presidenteNombre}
                {partido.equipoVisitante.presidenteApellidos}
              </p>
            </div>
            <div className="equipo-datos">
              <p className="nombre">{partido.equipoVisitante.nombre}</p>
              <img
                src={partido.equipoVisitante.image}
                alt={partido.equipoVisitante.nombre}
              />
            </div>
          </div>
        </div>
      </section>
      {renderFunctions()}
    </article>
  );
}
