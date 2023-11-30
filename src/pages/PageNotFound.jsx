import { Link } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { IoIosArrowRoundBack } from "react-icons/io";
const PageNotFound = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Ops!! This Page is not Found</h1>
          <Link to={PATHS.all_dishes} className="btn btn-primary  mt-4">
            Go Back
            <IoIosArrowRoundBack className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
