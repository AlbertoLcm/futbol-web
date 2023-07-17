import { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { instance } from "../../../api/instance";
import { errorAlert, successAlert } from "../../../components/Alerts";
import { useNavigate, useParams } from "react-router-dom";
import {
  presidentesSchema,
  presidentesSchemaEdit,
} from "../schemas/presidentesSchemas";
import "../../../styles/Forms.css";
import { LinearProgress } from "@mui/material";
import { routes } from "../../../helpers/routes";
import { DatePicker } from "@mui/x-date-pickers";

function FormUpdatePresidente() {
  const [imagen, setImagen] = useState(null);
  const { dni } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getPresidente = () => {
    instance
      .get(`/presidentes/${dni}`)
      .then((response) => {
        const { fecha_creacion, fecha_actualizacion, ...rest } =
          response.data.data;
        formik.setValues(rest);
        setImagen(response.data.data.image);
      })
      .catch((error) => errorAlert("Error", error.response.data.message))
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (values) => {
    try {
      await instance.patch(`/presidentes/update/${dni}`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      successAlert("Éxito", "Presidente actualizado correctamente");
      setImagen(null);
      navigate(routes.presidentes.root);
    } catch (error) {
      console.log(error);
      errorAlert("Error", error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: presidentesSchema,
    validationSchema: presidentesSchemaEdit,
    onSubmit: handleSubmit,
  });

  useEffect(() => getPresidente(), []);

  if (loading) return <LinearProgress />;

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <h2>Actualizar Presidente</h2>
        <div>
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
        </div>
        <div>
          <TextField
            fullWidth
            autoComplete="off"
            id="apellidos"
            name="apellidos"
            label="Apellidos"
            value={formik.values.apellidos}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
            helperText={formik.touched.apellidos && formik.errors.apellidos}
          />
        </div>
        <div>
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
        </div>
        <div>
          <DatePicker
            label="Fecha de nacimiento"
            onChange={(value) => formik.setFieldValue("fecha_nacimiento", value.format())}
          />
        </div>
        <div>
          <div className="file-select" id="src-file">
            <input
              type="file"
              id="imagen"
              name="imagen"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setImagen(URL.createObjectURL(e.target.files[0]));
                formik.setFieldValue("imagen", e.target.files[0]);
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
        <button type="submit">Actualizar Presidente</button>
      </form>
    </Fragment>
  );
}

export default FormUpdatePresidente;
