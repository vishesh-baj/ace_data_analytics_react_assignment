import PropTypes from "prop-types";
const LoginSection = ({ heading, paragraph }) => {
  return (
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">{heading}</h1>
      <p className="py-6">{paragraph}</p>
    </div>
  );
};

LoginSection.propTypes = {
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
};

export default LoginSection;
