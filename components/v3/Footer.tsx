import Link from "next/link";
import React from "react";
// which icons to use?
import { FiInstagram, FiMail, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer>
      <Link href="/" className="title">
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
          <Link href="/v3/members">Members</Link>
        </div>
      </div>
      <div className="socials">
        <span>Follow us</span>
        <div className="socials-link">
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
      </div>
    </footer>
  );
}
