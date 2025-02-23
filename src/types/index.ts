import { ColumnDef } from "@tanstack/react-table";

export interface Author {
  id: string;
  name: string;
}
export interface SearchPostProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  userId: string;
}

export interface PostListProps {
  posts: Post[];
  authors: { id: string; name: string }[];
}

export interface UserProfile {
  id: string;
  username: string;
  role: string;
}
export interface EditPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    date: string;
    userId: string;
  } | null;
  authors: { id: string; name: string }[];
  onClose: () => void;
}
export interface DeletePostProps {
  postId: string;
}

export interface CustomTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (id: string) => void;
}
export type FieldType = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "checkbox" | "textarea" | "select" | "multiselect" | string;
  options?: { label: string; value: string }[];
};

export type CustomFormProps = {
  fields: FieldType[];
  validationSchema?: any;
  onSubmit: (data: any) => void;
  textBtn?: string;
  defaultValues?: any;
  children?: React.ReactNode;
};
export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export interface AddPostProps {
  authors: { id: string; name: string }[];
}
export const __TYPES_VERSION__ = 1;
