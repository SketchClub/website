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
  const { footerText } = useCommonData();
  return (
    <footer id="footer">
      <div className="logo-container">
        <Link href="/" className="img-container">
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
          href="mailto:"
          className="mail"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope />
        </a>
        <a
          href={"https://instagram.com/"}
          className="insta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href={"https://instagram.com/"}
          className="insta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href={"https://instagram.com/"}
          className="insta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitterSquare />
        </a>
      </div>
      <div className="navbar">
        <Link href="/">Home</Link>
        <Link href="/#about">About</Link>
        <Link href="/events">Events</Link>
        <Link href="/member">Members</Link>
      </div>
      <div className="about">
        <Link href="/" className="img-container">
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
