import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Header() {
  const [mobileView, setMobileView] = useState(false);
  function close() {
    setMobileView(false);
  }
  return (
    <header id="header">
      <div className="head-container">
        <Link href="/" className="img-container">
          <Image
            src="/assets/v2/sketch-logo.png"
            alt="header-logo"
            fill
            sizes="100%"
            priority
          />
        </Link>
        <nav id="navbar" className={`${mobileView ? "active" : "inactive"}`}>
          <Link href="/" onClick={() => setMobileView(!mobileView)}>
            Home
          </Link>
          <Link href="/#about" onClick={() => setMobileView(!mobileView)}>
            About
          </Link>
          <Link href="/events" onClick={() => setMobileView(!mobileView)}>
            Events
          </Link>
          <Link href="/member" onClick={() => setMobileView(!mobileView)}>
            Members
          </Link>
        </nav>
        <div
          className={`${mobileView ? "open" : "close"} burger`}
          onClick={() => setMobileView(!mobileView)}
        >
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
        </div>
      </div>
    </header>
  );
}
