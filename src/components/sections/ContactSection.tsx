import { memo } from "react";
import { MdArrowOutward } from "react-icons/md";
import SectionHeading from "../ui/SectionHeading";
import { siteContent } from "../../content";
import { SECTION_IDS } from "../../constants/layout";
import { isPlaceholderValue } from "../../utils/placeholders";

const ContactSection = () => {
  return (
    <section className="contact section-shell" id={SECTION_IDS.contact}>
      <SectionHeading kicker="Contact" align="left">
        <span className="animate-title">
          Available for product engineering roles, platform work, and thoughtful technical collaboration.
        </span>
      </SectionHeading>
      <div className="contact__grid">
        <article className="contact__card">
          <h3>Reach out</h3>
          <a href={`mailto:${siteContent.contact.email}`}>{siteContent.contact.email}</a>
          <a href={`tel:${siteContent.contact.phone.replace(/\s+/g, "")}`}>{siteContent.contact.phone}</a>
          <p>{siteContent.contact.location}</p>
          <a
            className="contact__resume"
            href={siteContent.contact.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Resume
            <MdArrowOutward />
          </a>
        </article>
        <article className="contact__card">
          <h3>Education</h3>
          {siteContent.education.map((entry) => (
            <div className="contact__education" key={entry.institution}>
              <h4>{entry.institution}</h4>
              <p>{entry.credential}</p>
              <p>{entry.period}</p>
              <p>{entry.location}</p>
              {entry.notes && <p>{entry.notes}</p>}
            </div>
          ))}
        </article>
        <article className="contact__card">
          <h3>Achievements</h3>
          {siteContent.achievements.map((achievement) => (
            <div className="contact__achievement" key={achievement.label}>
              <h4>{achievement.label}</h4>
              <p>{achievement.detail}</p>
            </div>
          ))}
          <div className="contact__profiles">
            {siteContent.socials.map((social) =>
              isPlaceholderValue(social.url) ? (
                <span className="contact__pending" key={social.platform}>
                  {social.label}
                </span>
              ) : (
                <a href={social.url} key={social.platform} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              )
            )}
          </div>
        </article>
      </div>
    </section>
  );
};

export default memo(ContactSection);
