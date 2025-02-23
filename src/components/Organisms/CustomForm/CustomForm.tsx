import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { CustomFormProps } from "../../../types";

const CustomForm: React.FC<CustomFormProps> = ({ fields, validationSchema, onSubmit, textBtn, defaultValues = {}, children }) => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined, // Use yupResolver
    defaultValues,
  });

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
    reset(defaultValues || {});
    fields.forEach((field) => setValue(field.name, defaultValues[field.name] || ""));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off" className="max-w-[500px] mx-auto my-[50px] p-[20px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] rounded-[10px]">
      {fields.map((field) => (
        <div key={field.name}>
          {field.type !== "checkbox" && (
            <label htmlFor={field.name} className="font-bold block mb-[5px]">
              {field.label}
            </label>
          )}

          <Controller
            name={field.name}
            control={control}
            defaultValue={defaultValues[field.name] || ""} // Ensure controlled component
            render={({ field: controllerField }) => (
              <>
                {field.type === "select" ? (
                  <select {...controllerField} id={field.name} className="w-full p-[10px] mb-[10px]  border  border-gray-300  rounded-[5px] text-sm ">
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "multiselect" ? (
                  <select
                    id={field.name}
                    multiple
                    {...controllerField}
                    onChange={(e) => {
                      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
                      controllerField.onChange(selectedValues);
                    }}
                    className="w-full p-[10px] mb-[10px] border border-gray-300 rounded-[5px] text-sm"
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <div className="flex items-center mb-[10px]">
                    <input type="checkbox" id={field.name} {...controllerField} checked={!!controllerField.value} className="mr-2" />
                    <label htmlFor={field.name}>{field.label}</label>
                  </div>
                ) : field.type === "textarea" ? (
                  <textarea {...controllerField} id={field.name} rows={4} className="w-full p-[10px] mb-[10px] border border-gray-300 rounded-[5px] text-sm resize-none" />
                ) : (
                  <input {...controllerField} id={field.name} type={field.type} onChange={(e) => controllerField.onChange(e.target.value.trim())} className="w-full p-[10px] mb-[10px] border border-gray-300 rounded-[5px] text-sm" />
                )}

                {errors[field.name] && <p className="text-red-500 text-xs mt-[-8px] mb-[10px] ">{errors[field.name]?.message as string}</p>}
              </>
            )}
          />
        </div>
      ))}

      <button type="submit" className="w-full p-[10px] bg-[#007bff] text-white rounded-[5px] text-[16px] cursor-pointer mt-[10px] hover:bg-[#0056b3]">
        {textBtn ?? "ارسال"}
      </button>
      {children}
    </form>
  );
};

export default CustomForm;
