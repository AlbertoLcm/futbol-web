import * as Yup from "yup";

export const partidosSchema = {
  goles_local: "",
  goles_visitante: "",
  equipo_local_id: "",
  equipo_visitante_id: "",
};

export const partidosSchemaCreate = Yup.object().shape({
  goles_visitante: Yup.string().required("Ingresa los goles del equipo visitante"),
  goles_local: Yup.string().required("Ingresa los goles del equipo local"),
  equipo_local_id: Yup.string().required("Ingresa el equipo local"),
  equipo_visitante_id: Yup.string().required("Ingresa el equipo visitante"),
});

export const partidosSchemaUpdate = Yup.object().shape({
  goles_fuera: Yup.string().optional(),
  goles_casa: Yup.string().optional(),
  equipo_local_id: Yup.string().optional(),
  equipo_visitante_id: Yup.string().optional(),
});
