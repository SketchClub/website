import Link from "next/link";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { AiFillInstagram } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import { useRef } from "react";

export default function Header() {
  const ulNavLinksRef = useRef<HTMLUListElement>((<></>) as any);
  const burgerRef = useRef<HTMLDivElement>((<></>) as any);
  function navi() {
    try {
      let ulElem = ulNavLinksRef.current;
      //toggle nav
      ulElem?.classList.toggle("nav-active");
      //animate links
      ulElem.querySelectorAll("li").forEach((link, index) => {
        var linkk = link as HTMLElement;
        if (linkk.style.animation) {
          linkk.style.animation = "";
        } else {
          linkk.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });
      //burger animation
      let burgerElem = burgerRef.current;
      burgerElem?.classList.toggle("toggle");
      document.addEventListener("scroll", function elos() {
        //toggle nav
        ulElem?.classList.toggle("nav-active");
        //animate links
        document.querySelectorAll(".nav-links li").forEach((link, index) => {
          var linkk = link as HTMLElement;
          if (linkk.style.animation) {
            linkk.style.animation = "";
          } else {
            linkk.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`;
          }
        });
        //burger animation
        burgerElem?.classList.toggle("toggle");
        document.removeEventListener("scroll", elos);
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div id="header">
      <Link href="/v1/" className="img-container" aria-label="Home">
        <Image
          src="/assets/images/logo.png"
          alt="Sketch logo"
          fill
          sizes="100%"
          style={{ objectFit: "cover" }}
        />
      </Link>
      <div className="btns">
        <Link href="/v1/events" aria-label="Events">
          <Button variant="outline-light" id="btn_eve_head">
            Our Events
          </Button>
        </Link>
        <Link href="/v1/team" aria-label="Team">
          <Button variant="outline-light" id="btn_team_head">
            Our Team
          </Button>
        </Link>
        <nav className="headNav">
          <ul className="nav-links" ref={ulNavLinksRef}>
            <li
              onClick={() => {
                navi();
              }}
            >
              <Link href="/v1/" aria-label="Home">
                Home
              </Link>
            </li>
            <li
              onClick={() => {
                navi();
              }}
            >
              <Link href="/v1/about" aria-label="About Sketch">
                About us
              </Link>
            </li>
            <li
              onClick={() => {
                navi();
              }}
            >
              <Link href="/v1/contact" aria-label="Contact">
                Contact us
              </Link>
            </li>
            <li
              onClick={() => {
                navi();
              }}
            >
              <Link href="/v1/events" aria-label="Events">
                Events
              </Link>
            </li>
            <li
              onClick={() => {
                navi();
              }}
            >
              <a
                href="https://instagram.com/srmsketch"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join Sketch"
              >
                Join us
              </a>
            </li>
            <li
              onClick={() => {
                navi();
              }}
            >
              <Link href="/team" aria-label="Sketch Team">
                Team
              </Link>
            </li>
            <li
              onClick={() => {
                navi();
              }}
              className="icons"
            >
              <a
                href="https://instagram.com/srmsketch"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Sketch Instagram"
              >
                <AiFillInstagram color="black" />
              </a>
              <a
                href="https://discord.gg/SCCkz4yX9j"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Sketch Discord"
              >
                <FaDiscord color="black" />
              </a>
              <a
                href="mailto:sketch.srm@gmail.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Sketch Email"
              >
                <MdEmail color="black" />
              </a>
            </li>
          </ul>
        </nav>

        <div
          className="burger"
          ref={burgerRef}
          onClick={() => {
            navi();
          }}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    </div>
  );
}
