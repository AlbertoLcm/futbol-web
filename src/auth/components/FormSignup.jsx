import { useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { routes } from "../../helpers/routes";
import { registerSchema, initialValuesRegister } from "./schemas/authSchemas";
import "../../styles/Forms.css";

function FormLogin() {
  const { signup } = useAuth();
  const [imagen, setImagen] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setSending(true);
    await signup(values);
    resetForm();
    setSending(false);
  };

  const formik = useFormik({
    initialValues: initialValuesRegister,
    validationSchema: registerSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Registrate</h2>
      <p>
        ¿Ya tienes una cuenta?, <Link to={routes.login}>Ingresar.</Link>
      </p>
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
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Correo Electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Contraseña"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
      <button type="submit" disabled={sending}>Ingresar</button>
    </form>
  );
}

export default FormLogin;
