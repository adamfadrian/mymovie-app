import React, { FC } from "react";

interface ButtonProps {
  label?: any;
  name?: any;
  onClick?: React.MouseEventHandler;
}

export const Button: FC<ButtonProps> = ({ label, name, onClick }) => {
  return (
    <button
      id={name}
      className="w-full bg-blue-500 rounded-md text-white font-semibold"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
