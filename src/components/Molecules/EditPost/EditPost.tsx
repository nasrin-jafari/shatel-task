import React, { useState } from "react";

import { toast } from "react-toastify";
import { validationSchemaPost } from "../../../constants/Schema";
import { useEditPostMutation } from "../../../redux/services/postApi";
import { EditPostProps, Post } from "../../../types";
import CustomForm from "../../Organisms/CustomForm/CustomForm";
import CustomModal from "../../Organisms/CustomModal/CustomModal";
import { postFields } from "../../../constants";

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
      {post && <CustomForm fields={postFields(authors)} defaultValues={post} onSubmit={handleEdit} validationSchema={validationSchemaPost} textBtn={isSubmitting ? "در حال ویرایش..." : "ویرایش"} />}
    </CustomModal>
  );
};

export default EditPost;
