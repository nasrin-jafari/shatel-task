import React, { useState } from "react";
import { toast } from "react-toastify";
import { postFields } from "../../../constants";
import { validationSchemaPost } from "../../../constants/Schema";
import { useAddPostMutation } from "../../../redux/services/postApi";
import { AddPostProps, Post } from "../../../types";
import CustomForm from "../../Organisms/CustomForm/CustomForm";
import CustomModal from "../../Organisms/CustomModal/CustomModal";

const AddPost: React.FC<AddPostProps> = ({ authors }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addPost] = useAddPostMutation();

  const handleAddPost = async (formData: Partial<Post>) => {
    try {
      await addPost({ ...formData, date: new Date().toISOString() }).unwrap();
      toast.success("پست جدید با موفقیت ایجاد شد!");
      setIsModalOpen(false);
    } catch {
      toast.error("خطا در ایجاد پست جدید!");
    }
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="bg-primary ml-3 text-white px-3 py-2 rounded cursor-pointer hover:bg-secondary mb-2 transition-colors">
        افزودن پست جدید
      </button>
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="mr-3">ایجاد پست جدید</h3>
        <CustomForm validationSchema={validationSchemaPost} fields={postFields(authors)} onSubmit={handleAddPost} textBtn="ارسال" />
      </CustomModal>
    </>
  );
};

export default AddPost;
