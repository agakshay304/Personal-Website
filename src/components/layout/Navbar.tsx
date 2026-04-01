import HoverLink from "../ui/HoverLink";
import { SECTION_IDS } from "../../constants/layout";
import { siteContent } from "../../content";
import { isPlaceholderValue } from "../../utils/placeholders";

const navLinks = [
  { label: "About", href: `#${SECTION_IDS.about}` },
  { label: "Work", href: `#${SECTION_IDS.projects}` },
  { label: "Contact", href: `#${SECTION_IDS.contact}` },
];

const primaryLink = siteContent.socials.find(
  (social) => social.platform === "LinkedIn" && !isPlaceholderValue(social.url)
);

const Navbar = () => {
  return (
    <header className="navbar">
      <a className="navbar__brand" href="#" data-cursor="disable">
        AG
      </a>
      {primaryLink ? (
        <a
          className="navbar__cta"
          href={primaryLink.url}
          target="_blank"
          rel="noreferrer"
          data-cursor="disable"
        >
          {primaryLink.label}
        </a>
      ) : (
        <span className="navbar__cta navbar__cta--placeholder" data-cursor="disable">
          Add LinkedIn link in content/socials.ts
        </span>
      )}
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a data-href={link.href} href={link.href}>
                <HoverLink text={link.label.toUpperCase()} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
