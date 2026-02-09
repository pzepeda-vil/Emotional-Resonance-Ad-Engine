import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ id, label, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-indigo-300 mb-2">
        {label}
      </label>
      <input
        id={id}
        className="w-full bg-indigo-950/80 border-2 border-indigo-700 text-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:outline-none transition duration-200 placeholder-gray-500"
        {...props}
      />
    </div>
  );
};

export default Input;
