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

function Equipos() {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getEquipos = () => {
    instance
      .get("/equipos")
      .then((res) => setEquipos(res.data.data))
      .catch((err) => errorAlert("Error", err.response.data.message))
      .finally(() => setLoading(false));
  };

  const actionCreate = () => {
    navigate(routes.equipos.create);
  };
  
  const actionEdit = (codigo) => {
    navigate(routes.equipos.edit(codigo));
  };

  const actionDelete = async (codigo) => {
    try {
      await instance.delete(`/equipos/delete/${codigo}`);
      successAlert("Exito", "Equipo eliminado correctamente");
      getEquipos();
    } catch (error) {
      errorAlert("Error", error.response.data.message);
    }
  };

  useEffect(() => getEquipos(), []);

  if (loading) return <LinearProgress />;

  return (
    <section className="table-list">
      <h2>Lista de equipos</h2>
      <button onClick={actionCreate}>Agregar equipo</button>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, background: "#2C343A" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Estadio</TableCell>
              <TableCell>Aforo</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Presidente</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Funciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipos.map((equipo) => (
              <TableRow
                key={equipo.codigo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {equipo.nombre}
                </TableCell>
                <TableCell component="th" scope="row">
                  {equipo.estadio}
                </TableCell>
                <TableCell component="th" scope="row">
                  {equipo.aforo}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Avatar
                    src={equipo.image}
                    alt={equipo.nombre}
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {equipo.presidenteNombre}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Avatar
                    src={equipo.presidenteImage}
                    alt={equipo.presidenteNombre}
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell className="buttons">
                  <button
                    className="button-edit"
                    onClick={() => actionEdit(equipo.codigo)}
                  >
                    ✏️
                  </button>
                  <button
                    className="button-delete"
                    onClick={() => actionDelete(equipo.codigo)}
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

export default Equipos;
