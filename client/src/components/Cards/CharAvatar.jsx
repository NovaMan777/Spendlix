import React from "react";
import { getInitials } from "../../utils/helper";
import classNames from "classnames";

export const CharAvatar = ({ 
  fullName, 
  width = "w-12", 
  height = "h-12", 
  style = "",
  className = "",
  size = "md",
  shadow = true,
  border = false,
  hoverEffect = true
}) => {
  // Size presets
  const sizeClasses = {
    xs: "w-8 h-8 text-xs",
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-14 h-14 text-lg",
    xl: "w-16 h-16 text-xl"
  };

  // Color generation based on name hash (consistent colors for same names)
  const nameHash = fullName ? fullName.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0) : 0;

  const hue = Math.abs(nameHash) % 360;
  const bgColor = `hsl(${hue}, 70%, 45%)`;
  const textColor = `hsl(${hue}, 20%, 95%)`;

  return (
    <div
      className={classNames(
        "flex items-center justify-center rounded-full font-medium",
        "transition-all duration-300 transform",
        {
          "shadow-md": shadow,
          "border-2 border-white/30": border,
          "hover:scale-105 hover:shadow-lg": hoverEffect,
          [sizeClasses[size]]: true,
          [className]: className
        }
      )}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        ...(style && typeof style === 'object' ? style : {})
      }}
      title={fullName}
    >
      <span className="select-none">
        {getInitials(fullName || "?")}
      </span>
    </div>
  );
};

// Default props for the component
CharAvatar.defaultProps = {
  fullName: "",
  size: "md",
  shadow: true,
  border: false,
  hoverEffect: true
};