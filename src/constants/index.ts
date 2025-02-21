export const postFields = (authors: { label: string; value: string }[]) => [
  { name: "title", label: "عنوان", type: "text" },
  { name: "content", label: "محتوا", type: "textarea" },
  {
    name: "userId",
    label: "نویسنده",
    type: "select",
    options: authors,
  },
];
export const loginFields = [
  { name: "username", label: "نام کاربری", type: "text", col: 1 },
  { name: "password", label: "رمز عبور", type: "password", col: 1 },
];
export const rowsPerPageOptions = [5, 8, 10];
