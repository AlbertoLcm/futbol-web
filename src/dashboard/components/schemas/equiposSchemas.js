import * as Yup from "yup";

export const equiposSchema = {
  nombre: "",
  estadio: "",
  aforo: "",
  year: "",
  ciudad: "",
  dni_presidente: "",
};

export const equiposSchemaCreate = Yup.object().shape({
  nombre: Yup.string().required("Debes ingresar un nombre"),
  estadio: Yup.string().required("Debes ingresar el estadio"),
  aforo: Yup.number().required("Debes ingresar el aforo"),
  year: Yup.number().required("Debes ingresar el año"),
  ciudad: Yup.string().required("Debes ingresar la ciudad"),
  dni_presidente: Yup.string().required("Debes ingresar el dni del presidente"),
});

export const equiposSchemaEdit = Yup.object().shape({
  nombre: Yup.string().optional(),
  estadio: Yup.string().optional(),
  aforo: Yup.number().optional(),
  year: Yup.number().optional(),
  ciudad: Yup.string().optional(),
  dni_presidente: Yup.string().optional(),
});
