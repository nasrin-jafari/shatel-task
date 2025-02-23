import * as Yup from "yup";

export const validationSchemaPost = Yup.object({
  title: Yup.string().required("عنوان پست الزامی است."),
  content: Yup.string().trim().min(1, "محتوای پست الزامی است.").required("محتوای پست الزامی است."),
  userId: Yup.string().required("نویسنده انتخابی الزامی است."),
});

export const validationSchemaLogin = Yup.object().shape({
  username: Yup.string().required("نام کاربری الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
});
