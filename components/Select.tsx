import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: string[];
}

const Select: React.FC<SelectProps> = ({ id, label, options, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-indigo-300 mb-2">
        {label}
      </label>
      <select
        id={id}
        className="w-full bg-indigo-950/80 border-2 border-indigo-700 text-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:outline-none transition duration-200"
        {...props}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
