import { CiLogout } from "react-icons/ci";
import { PiCookingPotThin } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="navbar bg-base-100 opacity-80 hover:opacity-100 transition-all ease-in-out duration-300  md:sticky md:top-0 md:z-40 ">
      <div className="flex-1">
        <Link to={PATHS.all_dishes} className="btn btn-ghost text-xl">
          <PiCookingPotThin className="w-5 h-5" />
        </Link>
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
