import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { CustomFormProps } from "../../../types";

const inputClass = "w-full p-2 mb-3 border border-gray-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none focus:outline-none transition-colors duration-150";

const checkboxClass = "mr-2 focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-150";

const CustomForm: React.FC<CustomFormProps> = ({ fields, validationSchema, onSubmit, textBtn, defaultValues = {}, children }) => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues,
  });

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
    reset(defaultValues || {});
    fields.forEach((field) => setValue(field.name, defaultValues[field.name] || ""));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off" className="min-w-[500px] max-w-[900px] mx-auto my-12 p-8 bg-white shadow-lg rounded-lg">
      {fields.map((field) => (
        <div key={field.name}>
          {field.type !== "checkbox" && (
            <label htmlFor={field.name} className="font-bold block mb-1">
              {field.label}
            </label>
          )}

          <Controller
            name={field.name}
            control={control}
            defaultValue={defaultValues[field.name] || ""}
            render={({ field: controllerField }) => (
              <>
                {field.type === "select" ? (
                  <select {...controllerField} id={field.name} className={inputClass}>
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
                    className={inputClass}
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <div className="flex items-center mb-3">
                    <input type="checkbox" id={field.name} {...controllerField} checked={!!controllerField.value} className={checkboxClass} />
                    <label htmlFor={field.name}>{field.label}</label>
                  </div>
                ) : field.type === "textarea" ? (
                  <textarea {...controllerField} id={field.name} rows={4} className={`${inputClass} resize-none`} />
                ) : (
                  <input {...controllerField} id={field.name} type={field.type} onChange={(e) => controllerField.onChange(e.target.value.trim())} className={inputClass} />
                )}

                {errors[field.name] && <p className="text-red-500 text-xs mt-[-8px] mb-3">{errors[field.name]?.message as string}</p>}
              </>
            )}
          />
        </div>
      ))}

      <button type="submit" className="w-full p-2 bg-primary text-white rounded-md text-lg cursor-pointer mt-2 hover:bg-secondary transition-colors">
        {textBtn ?? "ارسال"}
      </button>
      {children}
    </form>
  );
};

export default CustomForm;
