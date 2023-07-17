import { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import {
  jugadoresSchema,
  jugadoresSchemaEdit,
} from "../schemas/jugadoresSchemas";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  LinearProgress
} from "@mui/material";
import { instance } from "../../../api/instance";
import "../../../styles/Forms.css";
import { errorAlert, successAlert } from "../../../components/Alerts";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../helpers/routes";

function FormUpdateJugador() {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagen, setImagen] = useState(null);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const { codigo } = useParams();

  const getJugador = () => {
    setLoading(true);
    instance
      .get(`/jugadores/${codigo}`)
      .then((response) => {
        const { fecha_creacion, fecha_actualizacion, ...rest } =
          response.data.data;
        formik.setValues(rest);
        setImagen(response.data.data.image);
      })
      .catch((error) => errorAlert("Error", error.response.data.message))
      .finally(() => setLoading(false));
  };
  
  const getEquipos = () => {
    setLoading(true);
    instance
      .get("/equipos")
      .then((res) => setEquipos(res.data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleSubmit = async(values, { resetForm }) => {
    try {
      setSending(true);
      await instance.patch(`/jugadores/update/${codigo}`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImagen(null);
      resetForm();
      successAlert("Exito", "Jugador Actualizado correctamente");
      navigate(routes.jugadores.root)
    } catch (error) {
      console.log(error)
      setSending(false);
      errorAlert("Error", error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: jugadoresSchema,
    validationSchema: jugadoresSchemaEdit,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getJugador()
    getEquipos()
  }, []);

  if (loading) return <LinearProgress />;

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <h2>Actualizar Jugador</h2>
        <div>
          <TextField
            fullWidth
            id="nombre"
            name="nombre"
            label="Nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Posicion</InputLabel>
            <Select
              labelId="posicion"
              id="posicion"
              name="posicion"
              value={formik.values.posicion}
              label="Posicion"
              onChange={formik.handleChange}
            >
              <MenuItem value={"Delantero"}>Delantero</MenuItem>
              <MenuItem value={"Defensa"}>Defensa</MenuItem>
              <MenuItem value={"Medio"}>Medio</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
        <Autocomplete
            disablePortal
            id="codigo_equipo"
            name="codigo_equipo"
            options={equipos}
            getOptionLabel={(option) => option.nombre}
            isOptionEqualToValue={(option, value) =>
              option.codigo === value.codigo
            }
            renderInput={(params) => (
              <TextField {...params} label="Equipo" />
            )}
            onChange={(e, value) =>
              formik.setFieldValue("codigo_equipo", value.codigo)
            }
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <div className="file-select" id="src-file">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setImagen(URL.createObjectURL(e.target.files[0]));
                formik.setFieldValue("image", e.target.files[0]);
              }}
            />
          </div>
        </div>
        {imagen && (
          <div className="preview-image-container">
            <img src={imagen} alt="perfil" className="preview-image" />
            <button
              className="btn-delete-image"
              onClick={() => {
                setImagen(null);
                formik.setFieldValue("imagen", null);
              }}
            >
              ✖
            </button>
          </div>
        )}
        <button type="submit" disabled={sending}>Actualizar Jugador</button>
      </form>
    </Fragment>
  );
}

export default FormUpdateJugador;
