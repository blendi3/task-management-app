import * as Yup from "yup";

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().required("Email is required"),
});
