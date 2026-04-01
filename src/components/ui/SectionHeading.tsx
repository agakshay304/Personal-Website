import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  kicker?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ kicker, children, align = "left" }: Props) => {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {kicker && <p className="section-heading__kicker">{kicker}</p>}
      <h2 className="section-heading__title">{children}</h2>
    </div>
  );
};

export default SectionHeading;
