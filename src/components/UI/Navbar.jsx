import { CiLogout } from "react-icons/ci";
import { PiCookingPotThin } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate(PATHS.loginPage);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <button className="btn btn-ghost text-xl">
          <PiCookingPotThin className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-none">
        <label
          htmlFor="app_drawer"
          className="btn btn-ghost drawer-button lg:hidden"
        >
          <RxHamburgerMenu className="w-5 h-5" />
        </label>
        <button onClick={handleLogout} className="btn btn-square btn-ghost">
          <CiLogout className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
