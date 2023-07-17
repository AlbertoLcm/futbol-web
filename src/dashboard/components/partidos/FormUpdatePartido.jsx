import { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import {
  partidosSchema,
  partidosSchemaUpdate,
} from "../schemas/partidosSchemas";
import { errorAlert, successAlert } from "../../../components/Alerts";
import { Autocomplete, LinearProgress } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { instance } from "../../../api/instance";
import "../../../styles/Forms.css";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../helpers/routes";

function FormUpdatePartido() {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { codigo } = useParams();
  const navigate = useNavigate();

  const getPartido = () => {
    setLoading(true);
    instance
      .get(`/partidos/${codigo}`)
      .then((response) => {
        const { fecha_creacion, fecha, fecha_actualizacion, ...rest } = response.data.data;
        formik.setValues(rest);
      })
      .catch((error) => errorAlert("Error", error.response.data.message))
      .finally(() => setLoading(false));
  };

  const getEquipos = () => {
    setLoading(true);
    instance
      .get("/equipos")
      .then((res) => setEquipos(res.data.data))
      .catch((err) => errorAlert("Error", err.response.data.message))
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await instance.patch(`/partidos/update/${codigo}`, values);
      successAlert("Exito", "Partido actualizado correctamente");
      resetForm();
      navigate(routes.home)
    } catch (error) {
      console.log(error);
      errorAlert("Error", error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: partidosSchema,
    validationSchema: partidosSchemaUpdate,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getPartido() 
    getEquipos();
  }, []);

  if (loading) return <LinearProgress />;

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <h2>Actualizar Partido</h2>
        <div className="form-group">
          <TextField
            fullWidth
            id="goles_local"
            name="goles_local"
            label="Goles equipo local"
            type="number"
            value={formik.values.goles_local}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.goles_local && Boolean(formik.errors.goles_local)
            }
            helperText={formik.touched.goles_local && formik.errors.goles_local}
          />
          <TextField
            fullWidth
            id="goles_visitante"
            name="goles_visitante"
            label="Goles equipo visitante"
            type="number"
            value={formik.values.goles_visitante}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.goles_visitante &&
              Boolean(formik.errors.goles_visitante)
            }
            helperText={
              formik.touched.goles_visitante && formik.errors.goles_visitante
            }
          />
        </div>
        <div>
          <Autocomplete
            disablePortal
            id="equipo_local_id"
            name="equipo_local_id"
            options={equipos}
            getOptionLabel={(option) => option.nombre}
            isOptionEqualToValue={(option, value) =>
              option.codigo === value.codigo
            }
            renderInput={(params) => (
              <TextField {...params} label="Equipo local" />
            )}
            onChange={(e, value) =>
              formik.setFieldValue("equipo_local_id", value.codigo)
            }
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <Autocomplete
            disablePortal
            id="equipo_visitante_id"
            name="equipo_visitante_id"
            options={equipos}
            getOptionLabel={(option) => option.nombre}
            isOptionEqualToValue={(option, value) =>
              option.codigo === value.codigo
            }
            renderInput={(params) => (
              <TextField {...params} label="Equipo visitante" />
            )}
            onChange={(e, value) =>
              formik.setFieldValue("equipo_visitante_id", value.codigo)
            }
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <DatePicker
            label="Fecha del partido"
            onChange={(value) => formik.setFieldValue("fecha", value.format())}
          />
        </div>
        <button type="submit">Actualizar Partido</button>
      </form>
    </Fragment>
  );
}

export default FormUpdatePartido;
