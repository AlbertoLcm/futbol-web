import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { useAuth } from "../hooks/useAuth";
import { initialValuesLogin, loginSchema } from "./schemas/authSchemas";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../helpers/routes";
import "../../styles/Forms.css";

function FormLogin() {
  const { login } = useAuth();
  const location = useLocation();

  const handleSubmit = async (values, { resetForm }) => {
    login(values.email, values.password, location.state?.from);
    resetForm();
  };

  const formik = useFormik({
    initialValues: initialValuesLogin,
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Iniciar Sesión</h2>
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
      <button type="submit">Ingresar</button>
      <p>
        ¿No tienes una cuenta?, <Link to={routes.signup}>Crear.</Link>
      </p>
    </form>
  );
}

export default FormLogin;
