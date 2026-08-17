import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const GithubIcon = ({ size = 24, color = 'currentColor', className, ...props }) => {
  return (
    <div
      className={twMerge('icon-github inline-block', className)}
      style={{
        width: size,
        height: size,
        color: color, // Because the mask uses background-color: currentColor
        ...props.style,
      }}
      {...props}
    />
  );
};
