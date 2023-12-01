import PropTypes from "prop-types";
import PrivateRoute from "./privateRoute";

const AdminRoute = ({ element, redirectTo }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? (
    <PrivateRoute element={element} redirectTo={redirectTo} />
  ) : null;
};

AdminRoute.propTypes = {
  element: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};


export default AdminRoute;
