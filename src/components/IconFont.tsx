import React from 'react';

interface IconFontProps extends React.CSSProperties {
  icon: string;
  onClick?: Function;
  className?: string;
}

export const IconFont = ({
  icon,
  onClick,
  className,
  ...props
}: Partial<IconFontProps>) => {
  return (
    <svg
      onClick={() => onClick?.()}
      style={{ ...props }}
      className={`iconpark-icon ${className}`}
    >
      <use href={'#' + icon}></use>
    </svg>
  );
};
