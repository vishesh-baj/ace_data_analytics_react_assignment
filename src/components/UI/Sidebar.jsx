import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
const Sidebar = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return (
    <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content z-50">
      <li>
        <Link to={PATHS.all_dishes}>Dishes</Link>
      </li>
      <li>
        <Link to={PATHS.rankings}>Rankings</Link>
      </li>
      {isAdmin && (
        <li>
          <Link to={PATHS.allUsers}>Users Data</Link>
        </li>
      )}
    </ul>
  );
};

export default Sidebar;
