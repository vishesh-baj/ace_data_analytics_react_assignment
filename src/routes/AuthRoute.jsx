import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { PATHS } from "./paths";

const AuthRoute = ({ element, redirectTo }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to={redirectTo || PATHS.all_dishes} replace />
  );
};

AuthRoute.propTypes = {
  element: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default AuthRoute;
