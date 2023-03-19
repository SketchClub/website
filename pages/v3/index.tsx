import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { useCommonData } from "../../hooks";
const NeonLogo = dynamic(() => import("../../components/v3/NeonLogo"));

export default function Home() {
  const { clubName, mission } = useCommonData();
  return (
    <section id="home">
      <NeonLogo />
      <main className="text-container">
        <h1 className="main-text" data-text={clubName}>
          {clubName}
        </h1>
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
