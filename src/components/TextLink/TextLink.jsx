import React from 'react';
import * as LucideIcons from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GithubIcon } from '../icons/GithubIcon';

export const TextLink = ({
  href,
  children,
  prefixIcon,
  suffixIcon,
  className,
  ...props
}) => {
  const PrefixIconComponent = prefixIcon === 'Github' ? GithubIcon : (prefixIcon ? LucideIcons[prefixIcon] : null);
  const SuffixIconComponent = suffixIcon === 'Github' ? GithubIcon : (suffixIcon ? LucideIcons[suffixIcon] : null);

  return (
    <a
      href={href}
      className={twMerge('text-link inline-flex items-center gap-1.5', className)}
      {...props}
    >
      {PrefixIconComponent && (
        <PrefixIconComponent size="1.1em" color="currentColor" className="shrink-0" />
      )}
      <span>{children}</span>
      {SuffixIconComponent && (
        <SuffixIconComponent size="1.1em" color="currentColor" className="shrink-0" />
      )}
    </a>
  );
};
