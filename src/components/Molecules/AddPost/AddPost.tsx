import React, { useState } from "react";
import { useAddPostMutation } from "../../../redux/services/postApi";
import { toast } from "react-toastify";
import { postFields } from "../../../constants";
import CustomForm from "../../Organisms/CustomForm/CustomForm";
import CustomModal from "../../Organisms/CustomModal/CustomModal";

interface AddPostProps {
  authors: { label: string; value: string }[];
}

const AddPost: React.FC<AddPostProps> = ({ authors }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addPost] = useAddPostMutation();

  const handleAddPost = async (formData: any) => {
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
      <button onClick={() => setIsModalOpen(true)}>افزودن پست جدید</button>
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>ایجاد پست جدید</h3>
        <CustomForm fields={postFields(authors)} onSubmit={handleAddPost} textBtn="ارسال" />
      </CustomModal>
    </>
  );
};

export default AddPost;
