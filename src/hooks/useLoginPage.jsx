import { useNavigate } from "react-router-dom";
import useSwal from "./useSwal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations";
import axios from "axios";
import { API_ENDPOINT } from "../constants";
import { PATHS } from "../routes/paths";

const useLoginPage = () => {
  const navigate = useNavigate();
  const swal = useSwal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (loginData) => {
    const users = (await axios.get(`${API_ENDPOINT}/users`)).data;
    const emailExists = users.filter((user) => {
      return user.email === loginData.email;
    });
    if (emailExists.length > 0) {
      if (emailExists[0].password === loginData.password) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userEmail", emailExists[0].email);
        localStorage.setItem("isAdmin", emailExists[0].isAdmin);
        navigate(PATHS.all_dishes);
      } else {
        swal.showErrorAlert(
          "Incorrect Password",
          "Please try again",
          "error",
          "Try Again"
        );
      }
    } else {
      swal.showErrorAlert(
        "Incorrect Email",
        "Please try again",
        "error",
        "Try Again"
      );
    }
  };
  return { handleSubmit, onSubmit, register, errors };
};

export default useLoginPage;
