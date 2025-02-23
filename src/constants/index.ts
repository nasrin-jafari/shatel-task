export const postFields = (authors: { id: string; name: string }[]) => [
  { name: "title", label: "عنوان", type: "text" },
  { name: "content", label: "محتوا", type: "textarea" },
  {
    name: "userId",
    label: "نویسنده",
    type: "select",
    options: [
      { label: "انتخاب کنید", value: "" },
      ...authors.map((author) => ({
        label: author.name,
        value: author.id,
      })),
    ],
  },
];

export const loginFields = [
  { name: "username", label: "نام کاربری", type: "text" },
  { name: "password", label: "رمز عبور", type: "password" },
];
export const rowsPerPageOptions = [5, 8, 10];
