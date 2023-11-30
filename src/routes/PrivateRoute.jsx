import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { PATHS } from "./paths";

const PrivateRoute = ({ element, redirectTo }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to={redirectTo || PATHS.loginPage} replace />
  );
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRoute;
