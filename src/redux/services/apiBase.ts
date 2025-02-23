import { fetchBaseQuery, FetchBaseQueryError, BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import fetch from "cross-fetch";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  fetchFn: fetch,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: Record<string, any> = {}) => {
  const token = localStorage.getItem("token");

  if (token && typeof args === "object" && "url" in args && args.url === "/login") {
    toast.info("شما قبلاً لاگین کرده‌اید!");
    return {
      error: {
        status: 409,
        data: { message: "شما قبلاً لاگین کرده‌اید!" },
      },
    };
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const { status, data } = result.error as FetchBaseQueryError;
    const errorMessage = (data as any)?.message || "مشکلی پیش آمده است!";

    switch (status) {
      case 400:
        toast.error(`درخواست نامعتبر است: ${errorMessage}`);
        break;
      case 401:
        toast.error("خطای احراز هویت! لطفاً دوباره وارد شوید.");
        localStorage.removeItem("token");
        break;
      case 403:
        toast.error("شما اجازه دسترسی به این بخش را ندارید.");
        break;
      case 404:
        toast.error("داده مورد نظر یافت نشد.");
        break;
      case 409:
        toast.info(errorMessage);
        break;
      case 500:
        toast.error("خطای سرور! لطفاً بعداً امتحان کنید.");
        break;
      default:
        toast.error(errorMessage);
    }
  }

  return result;
};

export default baseQueryWithReauth;
