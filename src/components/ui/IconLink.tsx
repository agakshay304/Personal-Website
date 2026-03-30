import { memo, ReactNode } from "react";
import { isPlaceholderValue } from "../../utils/placeholders";

interface IconLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
}

const IconLink = ({ href, label, icon }: IconLinkProps) => {
  if (isPlaceholderValue(href)) {
    return (
      <span className="icon-link icon-link--placeholder" aria-label={`${label} placeholder`}>
        {icon}
        <span>{label}</span>
      </span>
    );
  }

  return (
    <a
      className="icon-link"
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      data-cursor="icons"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

export default memo(IconLink);
