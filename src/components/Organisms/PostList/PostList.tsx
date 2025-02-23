import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Post, PostListProps } from "../../../types";
import useIsAdmin from "../../../hooks/useIsAdmin";
import { formatDistanceToNow } from "date-fns-jalali";
import CustomTable from "../CustomTable/CustomTable";
import EditPost from "../../Molecules/EditPost/EditPost";
import { useDeletePostMutation } from "../../../redux/services/postApi";
import { toast } from "react-toastify";

const PostList: React.FC<PostListProps> = ({ posts, authors }) => {
  const isAdmin = useIsAdmin();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [deletePost] = useDeletePostMutation();

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
  };

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId).unwrap();
      toast.success("پست با موفقیت حذف شد!");
    } catch (error) {
      toast.error("خطا در حذف پست!");
    }
  };

  const columns: ColumnDef<Post>[] = [
    { accessorKey: "id", header: "شناسه" },
    { accessorKey: "title", header: "عنوان" },
    { accessorKey: "content", header: "محتوا" },
    {
      accessorKey: "userId",
      header: "نویسنده",
      cell: ({ getValue }) => {
        const author = authors.find((a) => a.id === getValue());
        return author ? author.name : "ناشناس";
      },
    },
    {
      accessorKey: "date",
      header: "زمان انتشار",
      cell: ({ getValue }) => {
        const dateValue = getValue() as string;
        const parsedDate = new Date(dateValue);
        if (isNaN(parsedDate.getTime())) {
          return "زمان نامعتبر";
        }

        return formatDistanceToNow(parsedDate, { addSuffix: true });
      },
    },
  ];

  return (
    <div>
      <CustomTable data={posts} columns={columns} onEdit={isAdmin ? handleEdit : undefined} onDelete={isAdmin ? handleDelete : undefined} />
      {selectedPost && <EditPost post={selectedPost} authors={authors} onClose={() => setSelectedPost(null)} />}
    </div>
  );
};

export default PostList;
