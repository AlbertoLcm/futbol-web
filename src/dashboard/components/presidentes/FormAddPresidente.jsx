import { Fragment, useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { instance } from "../../../api/instance";
import { errorAlert, successAlert } from "../../../components/Alerts";
import {
  presidentesSchema,
  presidentesSchemaCreate,
} from "../schemas/presidentesSchemas";
import "../../../styles/Forms.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../helpers/routes";

function FormAddPresidente() {
  const [imagen, setImagen] = useState(null);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setSending(true);
      await instance.post("/presidentes/add", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImagen(null);
      resetForm();
      navigate(routes.presidentes.root);
      successAlert("Presidente agregado");
    } catch (error) {
      setSending(false);
      errorAlert("Error", error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: presidentesSchema,
    validationSchema: presidentesSchemaCreate,
    onSubmit: handleSubmit,
  });

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <h2>Agregar Presidente</h2>
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
        <button type="submit" disabled={sending}>Crear Presidente</button>
      </form>
    </Fragment>
  );
}

export default FormAddPresidente;
