import * as Yup from "yup";

export const signInSchema = Yup.object({
  userName: Yup.string()
    .required("Поле обязательно!")
    .max(25, "Максимальная длина - 25 символов"),
  password: Yup.string()
    .required("Поле обязательно!")
    .max(50, "Максимальная длина - 50 символов"),
});

export const signUpSchema = Yup.object({
  userName: Yup.string()
    .required("Поле обязательно!")
    .max(25, "Максимальная длина - 25 символов"),
  password: Yup.string()
    .required("Поле обязательно!")
    .max(50, "Максимальная длина - 50 символов"),
  role: Yup.number()
    .required("Поле обязательно!")
    .typeError("Значение должно быть числом!")
});
