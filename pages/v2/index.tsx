import Link from "next/link";
import React from "react";
import { QueryProps } from "../../types";
import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useCommonData } from "../../hooks";

export default function index() {
  // const cmd = getDataFromQueryKey([""], qup.queries).items[0];
  // console.log(cmd);
  const { clubName, mission, aboutIntro, design, develop, deliver, domains } =
    useCommonData();

  useEffect(() => {
    const elem =
      (document.querySelector(".main-banner") as HTMLElement) || null;
    var h1 = (document.querySelector(".main-banner h1") as HTMLElement) || null;
    var h2 = (document.querySelector(".main-banner h2") as HTMLElement) || null;
    var i =
      (document.querySelector(".main-banner .img-container") as HTMLElement) ||
      null;

    // const cssFilter = useCssFilter();
    elem.onmousemove = (e) => {
      var screenWidth = window.innerWidth;
      var percent = (e.x / screenWidth) * 255;

      if (h1 != null) {
        h1.style.color = `hsl(${percent},100%,50%)`;
        h1.style.textShadow = `0 0 8px hsl(${percent},100%,50%)`;
      }
      if (h2 != null) {
        h2.style.color = `hsl(${percent},100%,50%)`;
        h2.style.textShadow = `0 0 8px hsl(${percent},100%,50%)`;
      }
      if (i != null) {
        i.style.filter = `hue-rotate(${parseInt(
          String(percent)
        )}deg) grayscale(0%)`;
      }
    };
    elem.onmouseleave = (e) => {
      h1.style.color = `white`;
      h2.style.color = `white`;
      i.style.filter = `grayscale(100%)`;
      h1.style.textShadow = `0 0 0px black`;
      h2.style.textShadow = `0 0 0px black`;
    };
  }, []);
  return (
    <section id="Home">
      <Head>
        <title>Sketch | Home & About</title>
      </Head>
      <div className="main-banner">
        <h1>{clubName}</h1>
        <div className="img-container">
          <Image src="/assets/v2/logo.png" alt="logo" fill sizes="100%" />
        </div>
        <h2>Design. Develop. Deliver.</h2>
      </div>
      <main className="introduction" id="about">
        <div className="mission">
          <h3>Mission</h3>
          <p>{mission}</p>
        </div>
        <div className="about">
          <h3>About</h3>
          <p>{aboutIntro}</p>
        </div>
        <div className="vision">
          <h3>Vision</h3>
          <ul>
            <li key={1}>Design</li>
            <li key={2}>Develop</li>
            <li key={3}>Deliver</li>
          </ul>
        </div>
        <div className="domains">
          <h3>Domains</h3>
          <ul>
            {domains.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
      </main>
    </section>
  );
}
