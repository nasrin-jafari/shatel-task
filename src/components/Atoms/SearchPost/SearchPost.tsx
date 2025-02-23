import React from "react";
import { SearchPostProps } from "../../../types";

const SearchPost: React.FC<SearchPostProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="جستجوی عنوان..."
      value={value}
      onChange={onChange}
      className=" w-full max-w-[300px] p-2 mb-3 border border-gray-300 rounded text-sm  focus:border-primary focus:ring-1 focus:ring-primary outline-none focus:outline-none transition-colors duration-150"
    />
  );
};

export default SearchPost;
