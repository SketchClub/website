import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import gqlclient from "../../clients/gql-client";
import reactQueryClient from "../../clients/react-query-client";
import { useCommonData } from "../../hooks";
import { QueryProps } from "../../types";
import { getDataFromQueryKey } from "../../utils/common-functions";

function Outline({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 507 603"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M250.5 6L5.5 157.5V229.5L35.5 307.5L5.5 338.5V454L255 597L501.5 450V381.5L478.5 320.5L501.5 286V157.5L250.5 6Z"
        stroke="white"
        strokeWidth="3"
      />
    </svg>
  );
}

export default function Home() {
  const { clubName, mission } = useCommonData();
  useEffect(() => {
    var containerHeight = 500;
    var containerWidth = 500;
    var constant = 35;

    const example =
      (document.querySelector(".effect-container") as HTMLElement) || null;

    const circle_1 =
      (document.querySelector(
        ".effect-container .outline._1"
      ) as HTMLElement) || null;
    const circle_2 =
      (document.querySelector(
        ".effect-container .outline._2"
      ) as HTMLElement) || null;
    const circle_3 =
      (document.querySelector(
        ".effect-container .outline._3"
      ) as HTMLElement) || null;
    const circle_4 =
      (document.querySelector(
        ".effect-container .outline._4"
      ) as HTMLElement) || null;

    const c1 = 210;
    const c2 = 290;
    const c3 = 370;
    const c4 = 450;

    if (example != null) {
      example.onmousemove = function (e) {
        function move(x: number, y: number) {
          circle_1.style.left = `calc(${
            containerWidth / 2 + x * -0.35
          }px - ${c1}px / 2 )`;
          circle_1.style.bottom = `calc(${
            containerHeight / 2 + y * -0.35
          }px - ${c1}px / 2 )`;

          circle_2.style.left = `calc(${
            containerWidth / 2 + x * -0.35
          }px - ${c2}px / 2 - ${
            (constant * ((x * -100) / (containerWidth / 2))) / 100
          }px)`;
          circle_2.style.bottom = `calc(${
            containerHeight / 2 + y * -0.35
          }px - ${c2}px / 2  + ${
            (constant * ((y * 100) / (containerHeight / 2))) / 100
          }px)`;

          circle_3.style.left = `calc(${
            containerWidth / 2 + x * -0.35
          }px - ${c3}px / 2 - ${
            (constant * 2 * ((x * -100) / (containerWidth / 2))) / 100
          }px)`;
          circle_3.style.bottom = `calc(${
            containerHeight / 2 + y * -0.35
          }px - ${c3}px / 2 + ${
            (constant * 2 * ((y * 100) / (containerHeight / 2))) / 100
          }px)`;

          circle_4.style.left = `calc(${
            containerWidth / 2 + x * -0.35
          }px - ${c4}px / 2 - ${
            (constant * 3 * ((x * -100) / (containerWidth / 2))) / 100
          }px)`;
          circle_4.style.bottom = `calc(${
            containerHeight / 2 + y * -0.35
          }px - ${c4}px / 2 + ${
            (constant * 3 * ((y * 100) / (containerHeight / 2))) / 100
          }px)`;
        }
        if (
          (e?.currentTarget as HTMLElement)?.offsetLeft != null &&
          (e?.currentTarget as HTMLElement)?.offsetTop != null
        ) {
          var x = 0;
          if (
            e.pageX - (e?.currentTarget as HTMLElement)?.offsetLeft <=
            containerWidth / 2
          ) {
            x =
              containerWidth / 2 -
              (e.pageX - (e?.currentTarget as HTMLElement)?.offsetLeft);
          } else {
            x =
              e.pageX -
              (e?.currentTarget as HTMLElement)?.offsetLeft -
              containerWidth / 2;
          }
          var y = 0;
          if (
            e.pageY - (e?.currentTarget as HTMLElement)?.offsetTop <=
            containerHeight / 2
          ) {
            y =
              containerHeight / 2 -
              (e.pageY - (e?.currentTarget as HTMLElement)?.offsetTop);
          } else {
            y =
              e.pageY -
              (e?.currentTarget as HTMLElement)?.offsetTop -
              containerHeight / 2;
          }
          if (
            e.pageX - (e?.currentTarget as HTMLElement)?.offsetLeft <=
              containerWidth / 2 &&
            e.pageY - (e?.currentTarget as HTMLElement)?.offsetTop <=
              containerHeight / 2
          ) {
            x *= -1;
            move(x, y);
          } else if (
            e.pageX - (e?.currentTarget as HTMLElement)?.offsetLeft <=
              containerWidth / 2 &&
            e.pageY - (e?.currentTarget as HTMLElement)?.offsetTop >=
              containerHeight / 2
          ) {
            x *= -1;
            y *= -1;
            move(x, y);
          } else if (
            e.pageX - (e?.currentTarget as HTMLElement)?.offsetLeft >=
              containerWidth / 2 &&
            e.pageY - (e?.currentTarget as HTMLElement)?.offsetTop >=
              containerHeight / 2
          ) {
            y *= -1;
            move(x, y);
          } else if (
            e.pageX - (e?.currentTarget as HTMLElement)?.offsetLeft >=
              containerWidth / 2 &&
            e.pageY - (e?.currentTarget as HTMLElement)?.offsetTop <=
              containerHeight / 2
          ) {
            move(x, y);
          } else {
            console.log("error", x, y);
          }
        }
      };
      example.onmouseleave = function (e) {
        circle_1.style.left = "initial";
        circle_1.style.bottom = "initial";
        circle_2.style.left = "initial";
        circle_2.style.bottom = "initial";
        circle_3.style.left = "initial";
        circle_3.style.bottom = "initial";
        circle_4.style.left = "initial";
        circle_4.style.bottom = "initial";
      };
    }
  }, []);

  return (
    <section id="home">
      <div className="effect-container">
        <div className="img-container">
          <Image
            src="/assets/images/logo.png"
            className="logo-img"
            alt="logo"
            fill
          ></Image>
        </div>
        <Outline className="outline _1" />
        <Outline className="outline _2" />
        <Outline className="outline _3" />
        <Outline className="outline _4" />
      </div>
      <main className="text-container">
        <h1 className="main-text">{clubName}</h1>
        <p>{mission}</p>
        <Link href="/v3/about">
          <button type="button" className="button">
            Know more
          </button>
        </Link>
      </main>
    </section>
  );
}
