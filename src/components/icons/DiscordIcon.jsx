import React from 'react';
import { twMerge } from 'tailwind-merge';

export const DiscordIcon = ({ size = 24, color = 'currentColor', className, ...props }) => {
  return (
    <div
      className={twMerge('icon-discord inline-block', className)}
      style={{
        width: size,
        height: size,
        color: color, 
        ...props.style,
      }}
      {...props}
    />
  );
};
