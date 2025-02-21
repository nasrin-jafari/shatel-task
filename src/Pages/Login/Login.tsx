import React from "react";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/services/authApi";
import { loginFields } from "../../constants";
import { validationSchema } from "../../constants/Schema";
import CustomForm from "../../components/Organisms/CustomForm/CustomForm";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      const response = await login(data).unwrap();

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      toast.success("ورود موفقیت‌آمیز بود!");
      window.location.href = "/";
    } catch (err: any) {
      console.log(err.data?.message || "خطای ورود! لطفاً مجدداً تلاش کنید.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <CustomForm defaultValues={{ username: "", password: "" }} fields={loginFields} validationSchema={validationSchema} onSubmit={handleLogin} textBtn={isLoading ? "در حال ورود..." : "ورود"} />
    </div>
  );
};

export default Login;
