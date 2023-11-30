import * as yup from "yup";
export const loginSchema = yup.object({
  email: yup.string("Email must be a string").required("Email is required"),
  password: yup.string().required("Password is required")
});
