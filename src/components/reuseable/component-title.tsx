import React from 'react';
import Link from 'next/link'; // assuming you're using Next.js

interface ComponentTitleProps {
  title: string;
  description?: string;
  className?: string;
  descClassName?: string;
  link?: string; // optional link for description
}

export default function ComponentTitle({ title, description, className, descClassName, link }: ComponentTitleProps) {
  return (
    <div className="inner_container">
      <h2 className={`font-semibold text-xl ${className}`}>{title}</h2>
      {description && link ? (
        <Link href={link}>
          <p className={`text-sm text-muted-foreground cursor-pointer underline ${descClassName}`}>{description}</p>
        </Link>
      ) : description ? (
        <p className={`text-sm text-muted-foreground ${descClassName}`}>{description}</p>
      ) : null}
    </div>
  );
}
