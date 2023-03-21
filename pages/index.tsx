import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_app";

import { useRouter } from "next/router";
import type { versions } from "../types/global";

function Card({
  link,
  imgURL,
  imgAlt,
  text,
  version
}: {
  link: string;
  imgURL: string;
  imgAlt: string;
  text: string;
  version: versions;
}) {
  const [globalState, setGlobalState] = useContext(AppContext);
  return (
    <Link
      href={link}
      onClick={() => {
        setGlobalState({ ...globalState, version: version });
      }}
    >
      <div className="img-container">
        <Image src={imgURL} alt={imgAlt} fill sizes="100%" priority />
      </div>
      <span>{text}</span>
    </Link>
  );
}

export default function Home() {
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const toQuery = (router.query.to as string) ?? "";
    if (toQuery !== "") {
      setRedirectUrl(toQuery);
    }
  }, [router]);
  return (
    <>
      <Head>
        <title>~ SKETCH ~</title>
        <meta name="description" content={"Sketch Club"} />
      </Head>
      <main id="v">
        <h1>Welcome to sketch</h1>
        <span className="version">Select the version you want to use</span>
        <div className="cards-container">
          <Card
            link={`/v1/${redirectUrl}`}
            imgURL="/assets/images/v1glimpse.webp"
            imgAlt="Glimpse of Sketch website Space version by Gobind Singh"
            text="v1. Space by Gobind S."
            version="v1"
          />
          <Card
            link={`/v2/${redirectUrl}`}
            imgURL="/assets/images/v2glimpse.webp"
            imgAlt="Glimpse of Sketch website Anime version by Aishwarya Tewari"
            text="v2. Anime by Aishwarya T."
            version="v2"
          />
          <Card
            link={`/v3/${redirectUrl}`}
            imgURL="/assets/images/v3glimpse.webp"
            imgAlt="Glimpse of Sketch website Neon version by SaiRohit"
            text="v3. Neon by SaiRohit"
            version="v3"
          />
        </div>
        <p>Made with help and support from the whole Sketch team.</p>
      </main>
    </>
  );
}
