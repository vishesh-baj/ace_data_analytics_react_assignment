import PropTypes from "prop-types";
import Sidebar from "../components/UI/Sidebar";
import Navbar from "../components/UI/Navbar";
const AppLayout = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="app_drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <Navbar />

        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="app_drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar />
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
