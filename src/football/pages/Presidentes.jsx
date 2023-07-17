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
import moment from "moment/moment";

function Presidentes() {
  const [presidentes, setPresidentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getPresidentes = () => {
    instance
      .get("/presidentes")
      .then((res) => setPresidentes(res.data.data))
      .catch((err) => errorAlert("Error", err.response.data.message))
      .finally(() => setLoading(false));
  };

  const actionCreate = () => {
    navigate(routes.presidentes.create);
  };
  
  const actionEdit = (dni) => {
    navigate(routes.presidentes.edit(dni));
  };

  const actionDelete = async (dni) => {
    try {
      await instance.delete(`/presidentes/delete/${dni}`);
      successAlert("Exito", "Presidente eliminado correctamente");
      getPresidentes();
    } catch (error) {
      errorAlert("Error", error.response.data.message);
    }
  };

  useEffect(() => getPresidentes(), []);

  if (loading) return <LinearProgress />;

  return (
    <section className="table-list">
      <h2>Lista de presidentes</h2>
      <button onClick={actionCreate}>Agregar presidente</button>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, background: "#2C343A" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Fecha Nacimiento</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Funciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {presidentes.map((presidente) => (
              <TableRow
                key={presidente.dni}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {presidente.nombre}
                </TableCell>
                <TableCell component="th" scope="row">
                  {presidente.apellidos}
                </TableCell>
                <TableCell component="th" scope="row">
                  {presidente.year}
                </TableCell>
                <TableCell component="th" scope="row">
                  {presidente.fecha_nacimiento && moment(presidente.fecha_nacimiento).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Avatar
                    src={presidente.image}
                    alt={presidente.nombre}
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell className="buttons">
                  <button
                    className="button-edit"
                    onClick={() => actionEdit(presidente.dni)}
                  >
                    ✏️
                  </button>
                  <button
                    className="button-delete"
                    onClick={() => actionDelete(presidente.dni)}
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

export default Presidentes;
