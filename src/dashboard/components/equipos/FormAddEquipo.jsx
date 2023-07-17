import { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { Autocomplete, LinearProgress } from "@mui/material";
import { equiposSchema, equiposSchemaCreate } from "../schemas/equiposSchemas";
import { instance } from "../../../api/instance";
import { errorAlert, successAlert } from "../../../components/Alerts";
import "../../../styles/Forms.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../helpers/routes";

function FormAddEquipo() {
  const [presidentes, setPresidentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagen, setImagen] = useState(null);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const getPresidentes = () => {
    instance
      .get("/presidentes")
      .then((res) => setPresidentes(res.data.data))
      .catch((err) => errorAlert("Error", err.response.data.message))
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setSending(true);
      await instance.post("/equipos/add", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      successAlert("Éxito", "Equipo agregado exitosamente");
      setImagen(null);
      resetForm();
      navigate(routes.equipos.root)
    } catch (error) {
      setSending(false);
      errorAlert("Error", error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: equiposSchema,
    validationSchema: equiposSchemaCreate,
    onSubmit: handleSubmit,
  });

  useEffect(() => getPresidentes(), []);

  if (loading) return <LinearProgress />;

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <h2>Agregar Equipo</h2>
        <div className="form-group">
          <TextField
            fullWidth
            autoComplete="off"
            id="nombre"
            name="nombre"
            label="Nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />
          <TextField
            fullWidth
            autoComplete="off"
            id="estadio"
            name="estadio"
            label="Estadio"
            value={formik.values.estadio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.estadio && Boolean(formik.errors.estadio)}
            helperText={formik.touched.estadio && formik.errors.estadio}
          />
        </div>
        <div className="form-group">
          <TextField
            fullWidth
            autoComplete="off"
            id="aforo"
            name="aforo"
            label="Aforo"
            type="number"
            value={formik.values.aforo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.aforo && Boolean(formik.errors.aforo)}
            helperText={formik.touched.aforo && formik.errors.aforo}
          />
          <TextField
            fullWidth
            autoComplete="off"
            id="year"
            name="year"
            label="Año"
            value={formik.values.year}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.year && Boolean(formik.errors.year)}
            helperText={formik.touched.year && formik.errors.year}
          />
          <TextField
            fullWidth
            autoComplete="off"
            id="ciudad"
            name="ciudad"
            label="Ciudad"
            value={formik.values.ciudad}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ciudad && Boolean(formik.errors.ciudad)}
            helperText={formik.touched.ciudad && formik.errors.ciudad}
          />
        </div>
        <div>
          <Autocomplete
            disablePortal
            id="dni_presidente"
            name="dni_presidente"
            options={presidentes}
            getOptionLabel={(option) => option.nombre}
            isOptionEqualToValue={(option, value) => option.dni === value.dni}
            renderInput={(params) => (
              <TextField {...params} label="Presidente" />
            )}
            onChange={(e, value) =>
              formik.setFieldValue("dni_presidente", value.dni)
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
                formik.setFieldValue("image", null);
              }}
            >
              ✖
            </button>
          </div>
        )}
        <button type="submit" disabled={sending}>Crear Equipo</button>
      </form>
    </Fragment>
  );
}

export default FormAddEquipo;
