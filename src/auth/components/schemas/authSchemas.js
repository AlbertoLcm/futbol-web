import * as Yup from "yup";

export const initialValuesLogin = {
  email: "",
  password: "",
};

export const initialValuesRegister = {
  nombre: "",
  email: "",
  password: "",
};

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Correo invalido").required("Debes ingresar un correo electrónico"),
  password: Yup.string().required("Debes ingresar una contraseña"),
});

export const registerSchema = Yup.object().shape({
  nombre: Yup.string().required("Debes ingresar tu nombre"),
  email: Yup.string()
    .email("Correo invalido")
    .required("Debes ingresar un correo electrónico"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Debes ingresar una contraseña"),
});
