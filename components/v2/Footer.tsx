import Link from "next/link";
import Image from "next/image";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import { useCommonData } from "../../hooks";
export default function Footer() {
  const { footerText, instagram, linkedIn, email } = useCommonData();
  return (
    <footer id="footer">
      <div className="logo-container">
        <Link href="/v2/" className="img-container">
          <Image
            src="/assets/v2/orginal-logo.png"
            alt="header-logo"
            fill
            sizes="100%"
          />
        </Link>
      </div>

      <div className="socials">
        <a
          href={"mailto:" + email}
          className="mail"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope />
        </a>
        <a
          href={`https://instagram.com/` + instagram}
          className="insta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href={`https://www.linkedin.com/company/` + linkedIn}
          className="insta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href={`https://twitter.com/SrmSketch`}
          className="insta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitterSquare />
        </a>
      </div>
      <div className="navbar">
        <Link href="/v2/">Home</Link>
        <Link href="/v2#about">About</Link>
        <Link href="/v2/events">Events</Link>
        <Link href="/v2/team">Team</Link>
      </div>
      <div className="about">
        <Link href="/v2/" className="img-container">
          <Image
            src="/assets/v2/sketch-logo.png"
            alt="header-logo"
            fill
            sizes="100%"
          />
        </Link>
        <span>{footerText}</span>
      </div>
    </footer>
  );
}
