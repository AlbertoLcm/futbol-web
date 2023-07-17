export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  profile: "/profile",
  dashboard: "/dashboard",
  partidos: {
    create: "/partidos/create",
    edit: (codigo) =>
      codigo ? `/partidos/edit/${codigo}` : "/partidos/edit/:codigo",
  },
  jugadores: {
    root: "/jugadores",
    create: "/jugadores/create",
    edit: (codigo) =>
      codigo ? `/jugadores/edit/${codigo}` : "/jugadores/edit/:codigo",
  },
  equipos: {
    root: "/equipos",
    create: "/equipos/create",
    edit: (codigo) =>
      codigo ? `/equipos/edit/${codigo}` : "/equipos/edit/:codigo",
  },
  presidentes: {
    root: "/presidentes",
    create: "/presidentes/create",
    edit: (dni) =>
      dni ? `/presidentes/edit/${dni}` : "/presidentes/edit/:dni",
  },
};
