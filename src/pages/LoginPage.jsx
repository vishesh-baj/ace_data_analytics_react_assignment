import LoginSection from "../components/UI/LoginSection";
import useLoginPage from "../hooks/useLoginPage";
const LoginPage = () => {
  const { errors, handleSubmit, onSubmit, register } = useLoginPage();
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <LoginSection
          heading="Login"
          paragraph="Welcome to Dishes Rating App, A fully fledged app where you can add your favourite dishes and rank them based on your preference."
        />
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
              />
              <p className="text-rose-400 mt-1">{errors.email?.message}</p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
              />
              <p className="text-rose-400 mt-1">{errors.password?.message}</p>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" name="" id="" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
