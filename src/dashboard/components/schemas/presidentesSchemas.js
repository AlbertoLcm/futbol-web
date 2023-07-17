import * as Yup from "yup";

export const presidentesSchema = {
  nombre: "",
  apellidos: "",
  year: "",
};

export const presidentesSchemaCreate = Yup.object().shape({
  nombre: Yup.string().required("Debes ingresar un nombre"),
  apellidos: Yup.string().required("Debes ingresar los apellidos"),
  year: Yup.number().required("Debes ingresar el año"),
});

export const presidentesSchemaEdit = Yup.object().shape({
  nombre: Yup.string().optional(),
  apellidos: Yup.string().optional(),
  year: Yup.number().optional(),
});
