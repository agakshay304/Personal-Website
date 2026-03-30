import { memo, PropsWithChildren } from "react";

const TagPill = ({ children }: PropsWithChildren) => {
  return <span className="tag-pill">{children}</span>;
};

export default memo(TagPill);
