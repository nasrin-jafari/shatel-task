import React, { useState } from "react";

import { useEditPostMutation } from "../../../redux/services/postApi";
import { toast } from "react-toastify";
import { EditPostProps, Post } from "../../../types";
import CustomForm from "../../Organisms/CustomForm/CustomForm";
import CustomModal from "../../Organisms/CustomModal/CustomModal";

const EditPost: React.FC<EditPostProps> = ({ post, authors, onClose }) => {
  const [editPost] = useEditPostMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = async (formData: Partial<Post>) => {
    setIsSubmitting(true);
    try {
      await editPost(formData).unwrap();
      toast.success("پست با موفقیت ویرایش شد!");
      onClose();
    } catch (error) {
      toast.error("خطا در ویرایش پست!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomModal isOpen={!!post} onClose={onClose}>
      <h3>ویرایش پست</h3>
      {post && (
        <CustomForm
          fields={[
            { name: "title", label: "عنوان", type: "text" },
            { name: "content", label: "محتوا", type: "textarea" },
            {
              name: "userId",
              label: "نویسنده",
              type: "select",
              options: authors.map((author) => ({
                label: author.name,
                value: author.id,
              })),
            },
          ]}
          defaultValues={post}
          onSubmit={handleEdit}
          textBtn={isSubmitting ? "در حال ویرایش..." : "ویرایش"}
        />
      )}
    </CustomModal>
  );
};

export default EditPost;
