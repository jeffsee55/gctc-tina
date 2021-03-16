import React from "react";

export const SelectField = ({
  name,
  label,
  options,
  onChange,
  value,
}: {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  onChange: (args: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}) => {
  return (
    <div className="w-full mt-2">
      <select
        id={name}
        onChange={onChange}
        value={value}
        className="w-full mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
