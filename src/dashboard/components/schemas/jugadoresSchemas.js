import * as Yup from "yup";

export const jugadoresSchema = {
  nombre: "",
  posicion: "",
  codigoEquipo: "",
};

export const jugadoresSchemaCreate = Yup.object().shape({
  nombre: Yup.string().required("Debes ingresar un nombre"),
  posicion: Yup.string().required("Debes ingresar la posicion"),
  codigoEquipo: Yup.string().required("Ingresa el equipo al que pertenece"),
});

export const jugadoresSchemaEdit = Yup.object().shape({
  nombre: Yup.string().optional(),
  posicion: Yup.string().optional(),
  codigo_equipo: Yup.string().optional(),
});
