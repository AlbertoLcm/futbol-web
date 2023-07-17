import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, LinearProgress } from "@mui/material";
import { instance } from "../../api/instance";
import { errorAlert, successAlert } from "../../components/Alerts";
import { useNavigate } from "react-router-dom";
import { routes } from "../../helpers/routes";
import "../styles/Tables.css";

function Jugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getJugadores = () => {
    instance
      .get("/jugadores")
      .then((res) => setJugadores(res.data.data))
      .catch((err) => errorAlert("Error", err.response.data.message))
      .finally(() => setLoading(false));
  };

  const actionCreate = () => {
    navigate(routes.jugadores.create);
  };
  
  const actionEdit = (codigo) => {
    navigate(routes.jugadores.edit(codigo));
  };

  const actionDelete = async (codigo) => {
    try {
      await instance.delete(`/jugadores/delete/${codigo}`);
      successAlert("Exito", "Jugador eliminado correctamente");
      getJugadores();
    } catch (error) {
      errorAlert("Error", error.response.data.message);
    }
  };

  useEffect(() => getJugadores(), []);

  if (loading) return <LinearProgress />;

  return (
    <section className="table-list">
      <h2>Lista de jugadores</h2>
      <button onClick={actionCreate}>Agregar jugador</button>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, background: "#2C343A" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Posición</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Equipo</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Funciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jugadores.map((jugador) => (
              <TableRow
                key={jugador.codigo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {jugador.nombre}
                </TableCell>
                <TableCell component="th" scope="row">
                  {jugador.posicion}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Avatar
                    src={jugador.image}
                    alt={jugador.nombre}
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {jugador.equipoNombre}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Avatar
                    src={jugador.equipoImage}
                    alt={jugador.equipoNombre}
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell className="buttons">
                  <button
                    className="button-edit"
                    onClick={() => actionEdit(jugador.codigo)}
                  >
                    ✏️
                  </button>
                  <button
                    className="button-delete"
                    onClick={() => actionDelete(jugador.codigo)}
                  >
                    ✖
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}

export default Jugadores;
