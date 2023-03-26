import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiInstagram, FiMail, FiLinkedin } from "react-icons/fi";
import { useCommonData } from "../../hooks";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  function close() {
    setMenuOpen(false);
  }

  const { linkedIn, instagram, email } = useCommonData();
  return (
    <header>
      <Link className="logo img-container" href="/">
        <Image priority src="/assets/images/logo-grad-2.png" className="logo-img" alt="logo" fill sizes="100vw"></Image>
      </Link>
      <nav className={`${menuOpen ? "active" : ""}`}>
        <Link href="/v3/" onClick={close}>
          <span aria-hidden="true">Home</span>
          Home
        </Link>
        <Link href="/v3/about" onClick={close}>
          <span aria-hidden="true">About</span>
          About
        </Link>
        <Link href="/v3/events" onClick={close}>
          <span aria-hidden="true">Events</span>
          Events
        </Link>
        <Link href="/v3/team" onClick={close}>
          <span aria-hidden="true">Team</span>
          Team
        </Link>
        <div className="socials-link" onClick={close}>
          <Link href={`https://www.instagram.com/` + instagram}>
            <FiInstagram />
          </Link>
          <Link href={"mailto:" + email}>
            <FiMail />
          </Link>
          <Link href={`https://www.linkedin.com/company/` + linkedIn}>
            <FiLinkedin />
          </Link>
        </div>
      </nav>
      <div className={`${menuOpen ? "close" : ""} hamburger`} onClick={() => setMenuOpen(!menuOpen)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </header>
  );
}
