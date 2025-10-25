import React from 'react'

const Button = ({text,onClick, type=''}) => {
  return (
    <button type={type} onClick={onClick} className="py-2.5 px-4 text-white bg-[#6834ff] rounded flex justify-center items-center cursor-pointer">
      {text}
    </button>
  );
}

export default Button
