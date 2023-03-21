import Link from "next/link";
import React from "react";
// which icons to use?
import { FiInstagram, FiMail, FiLinkedin } from "react-icons/fi";
import { useCommonData } from "../../hooks";

export default function Footer() {
  const { linkedIn, instagram, email } = useCommonData();
  return (
    <footer>
      <Link href="/v3" className="title">
        Sketch
      </Link>
      <div className="motto">
        <span>Design</span>
        <span>Develop</span>
        <span>Deliver</span>
      </div>
      <div className="explore">
        <span>Explore</span>
        <div className="page-links">
          <Link href="/v3">Home</Link>
          <Link href="/v3/about">About</Link>
          <Link href="/v3/events">Events</Link>
          <Link href="/v3/team">Team</Link>
        </div>
      </div>
      <div className="socials">
        <span>Follow us</span>
        <div className="socials-link">
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
      </div>
    </footer>
  );
}
