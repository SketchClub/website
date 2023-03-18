import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiInstagram, FiMail, FiLinkedin } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  function close() {
    setMenuOpen(false);
  }

  return (
    <header>
      <Link className="logo" href={"/v3"}>
        <div className="img-container">
          <Image
            priority
            src="/assets/images/logo.png"
            className="logo-img"
            alt="logo"
            fill
          ></Image>
        </div>
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
        <Link href="/v3/members" onClick={close}>
          <span aria-hidden="true">Members</span>
          Members
        </Link>
        <div className="socials-link" onClick={close}>
          <Link href="/">
            <FiInstagram />
          </Link>
          <Link href="/">
            <FiMail />
          </Link>
          <Link href="/">
            <FiLinkedin />
          </Link>
        </div>
      </nav>
      <div
        className={`${menuOpen ? "close" : ""} hamburger`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </header>
  );
}
