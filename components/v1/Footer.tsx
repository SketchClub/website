import { FaDiscord, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { useCommonData } from "../../hooks";

export default function Footer() {
  const { footerText, email, instagram, linkedIn, youtube, discord } = useCommonData();
  return (
    <div id="footer">
      <div className="sitemap no-mobile big-width">
        <span>Sitemap</span>
        <Link href="/">Home</Link>
        <Link href="/about">About us</Link>
        <Link href="/events">Our Events</Link>
      </div>
      <div className="footrule no-mobile"></div>
      <div className="getInTouch big-width">
        <span>Get in touch</span>
        <Link href="/contact">Contact us</Link>
        <Link href="/team">Our Team</Link>
        <Link href="/join">Join us</Link>
      </div>
      <div className="footrule no-mobile"></div>
      <div className="icons big-width">
        <div className="up">
          <a href={`mailto:${email}`} target="_blank" rel="noreferrer" title="Sketch email">
            <MdEmail color="black" />
          </a>
          <a href={`https://discord.gg/${discord}`} target="_blank" rel="noreferrer noopener" title="Sketch Discord">
            <FaDiscord color="black" />
          </a>
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noreferrer noopener"
            title="Sketch Instagram"
          >
            <AiFillInstagram color="black" />
          </a>
        </div>
        <div className="down">
          <a title="Sketch LinkedIn" href={`https://www.linkedin.com/company/${linkedIn}`}>
            <FaLinkedin color="black" />
          </a>
          <a title="Sketch YouTube" href={`https://www.youtube.com/${youtube}?sub_confirmation=1`}>
            <AiFillYoutube color="black" />
          </a>
        </div>
      </div>
      <div className="footrule no-mobile"></div>
      <div className="intro big-width no-mobile">
        <div className="imgContainer">
          <Image
            src="/assets/images/old_logo.png"
            alt="Sketch old logo"
            className="img"
            layout="fill"
            objectFit="contain"
            quality={50}
          />
        </div>
        <p>{footerText}</p>
      </div>
    </div>
  );
}
