import { LinearProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Nabvar } from "../components/Navbar";
import { routes } from "../helpers/routes";
import PrivateRoute from "./PrivateRoute";
const LazyHome = lazy(() => import("../football/pages/Home"));
const LazyPartidosCreate = lazy(() =>
  import("../dashboard/components/partidos/FormAddPartido")
);
const LazyPartidosEdit = lazy(() =>
  import("../dashboard/components/partidos/FormUpdatePartido")
);
const LazyLogin = lazy(() => import("../auth/components/FormLogin"));
const LazySignup = lazy(() => import("../auth/components/FormSignup"));
const LazyEquipos = lazy(() => import("../football/pages/Equipos"));
const LazyPresidentes = lazy(() => import("../football/pages/Presidentes"));
const LazyJugadores = lazy(() => import("../football/pages/Jugadores"));
const LazyJugadoresCreate = lazy(() =>
  import("../dashboard/components/jugadores/FormAddJugador")
);
const LazyJugadoresEdit = lazy(() =>
  import("../dashboard/components/jugadores/FormUpdateJugador")
);
const LazyPresidentesCreate = lazy(() =>
  import("../dashboard/components/presidentes/FormAddPresidente")
);
const LazyPresidentesEdit = lazy(() =>
  import("../dashboard/components/presidentes/FormUpdatePresidente")
);
const LazyEquiposCreate = lazy(() =>
  import("../dashboard/components/equipos/FormAddEquipo")
);
const LazyEquiposEdit = lazy(() =>
  import("../dashboard/components/equipos/FormUpdateEquipo")
);

export function AppRouter() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Nabvar />
      <Routes>
        <Route path={routes.home} element={<LazyHome />} />
        <Route
          path={routes.partidos.create}
          element={
            <PrivateRoute>
              <LazyPartidosCreate />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.partidos.edit()}
          element={
            <PrivateRoute>
              <LazyPartidosEdit />
            </PrivateRoute>
          }
        />

        <Route path={routes.login} element={<LazyLogin />} />
        <Route path={routes.signup} element={<LazySignup />} />

        <Route path={routes.jugadores.root} element={<LazyJugadores />} />
        <Route
          path={routes.jugadores.create}
          element={
            <PrivateRoute>
              <LazyJugadoresCreate />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.jugadores.edit()}
          element={
            <PrivateRoute>
              <LazyJugadoresEdit />
            </PrivateRoute>
          }
        />

        <Route path={routes.presidentes.root} element={<LazyPresidentes />} />
        <Route
          path={routes.presidentes.create}
          element={
            <PrivateRoute>
              <LazyPresidentesCreate />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.presidentes.edit()}
          element={
            <PrivateRoute>
              <LazyPresidentesEdit />
            </PrivateRoute>
          }
        />

        <Route path={routes.equipos.root} element={<LazyEquipos />} />
        <Route
          path={routes.equipos.create}
          element={
            <PrivateRoute>
              <LazyEquiposCreate />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.equipos.edit()}
          element={
            <PrivateRoute>
              <LazyEquiposEdit />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}
