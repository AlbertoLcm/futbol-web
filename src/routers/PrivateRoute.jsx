import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import { routes } from "../helpers/routes";

const PrivateRoute = ({ children }) => {
    const location = useLocation();

    const { isLogin } = useAuth();

    if (!isLogin()) return <Navigate to={routes.login} state={{from: location}} />;
    return children;
};

export default PrivateRoute;