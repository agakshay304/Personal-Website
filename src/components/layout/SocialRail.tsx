import { memo, ReactNode } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiGeeksforgeeks, SiHackerrank, SiLeetcode } from "react-icons/si";
import { TbNumber3 } from "react-icons/tb";
import IconLink from "../ui/IconLink";
import HoverLink from "../ui/HoverLink";
import { siteContent } from "../../content";

const iconMap: Record<string, ReactNode> = {
  GitHub: <FaGithub />,
  LinkedIn: <FaLinkedinIn />,
  LeetCode: <SiLeetcode />,
  GeeksForGeeks: <SiGeeksforgeeks />,
  InterviewBit: <TbNumber3 />,
  HackerRank: <SiHackerrank />,
};

const SocialRail = () => {
  const { socials, contact } = siteContent;

  return (
    <aside className="social-rail">
      <div className="social-rail__icons">
        {socials.map((social) => (
          <IconLink
            key={social.platform}
            href={social.url}
            label={social.label}
            icon={iconMap[social.platform] ?? <FaGithub />}
          />
        ))}
      </div>
      <a
        className="social-rail__resume"
        href={contact.resumeUrl}
        target="_blank"
        rel="noreferrer"
      >
        <HoverLink text="Resume" />
      </a>
    </aside>
  );
};

export default memo(SocialRail);
