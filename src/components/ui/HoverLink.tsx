interface HoverLinkProps {
  text: string;
  disableCursor?: boolean;
}

const HoverLink = ({ text, disableCursor = false }: HoverLinkProps) => {
  return (
    <span className="hover-link" data-cursor={disableCursor ? undefined : "disable"}>
      <span>{text}</span>
      <span>{text}</span>
    </span>
  );
};

export default HoverLink;
