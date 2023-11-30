import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";
const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (loginData) => {
    console.log("LOGIN DATA: ", loginData);
    const users = (await axios.get("http://localhost:3000/users")).data;
    console.log("USERS: ", users);
    const emailExists = users.filter((user) => {
      return user.email === loginData.email;
    });
    if (emailExists.length > 0) {
      if (emailExists[0].password === loginData.password) {
        console.log("PASSWORD: ", emailExists[0].password);
        navigate(PATHS.all_dishes);
      } else {
        alert("Invalid Password");
      }
    } else {
      alert("Invalid Email");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Welcome to Dishes Rating App, Where you can rate all your favourite
            dishes in a single application
          </p>
        </div>
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
