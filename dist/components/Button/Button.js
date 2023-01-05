import React from "react";
const Button = props => {
  return /*#__PURE__*/React.createElement("button", {
    className: "inline-flex items-center rounded-full border border-transparent bg-[#4E75F6] px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3E67F0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
  }, props.label);
};
export default Button;