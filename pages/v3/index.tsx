import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useCommonData } from "../../hooks";
const NeonLogo = dynamic(() => import("../../components/v3/NeonLogo"));

export default function Home() {
  const { clubName, mission } = useCommonData();
  return (
    <section id="home">
      <Head>
        <title>{`${clubName} | Home`}</title>
        <meta name="description" content="Welcome to sketch" />
      </Head>
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
