import React from "react";
import { SearchPostProps } from "../../../types";

const SearchPost: React.FC<SearchPostProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="جستجوی عنوان..."
      value={value}
      onChange={onChange}
      style={{
        padding: "8px",
        marginBottom: "12px",
        width: "100%",
        maxWidth: "300px",
        borderRadius: "4px",
        border: "1px solid #ccc",
      }}
    />
  );
};

export default SearchPost;
