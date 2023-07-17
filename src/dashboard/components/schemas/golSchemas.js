import * as Yup from "yup";

export const golSchema = {
  minuto: "",
  codigo_jugador: "",
  codigo_partido: "",
  descripcion: "",
};

export const golSchemaCreate = Yup.object().shape({
  minuto: Yup.number().required("Ingresa el minuto del gol"),
  codigo_jugador: Yup.number().required("Ingresa el jugador que ha marcado el gol"),
  codigo_partido: Yup.number().required("Ingresa el partido en el que se ha marcado el gol"),
  descripcion: Yup.string().optional(),
});

export const golSchemaUpdate = Yup.object().shape({
  minuto: Yup.number().optional(),
  codigo_jugador: Yup.number().optional(),
  codigo_partido: Yup.number().optional(),
  descripcion: Yup.string().optional(),
});