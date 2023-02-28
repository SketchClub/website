import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_app";

import { GetServerSideProps } from "next";

import reactQueryClient from "../clients/react-query-client";
import gqlclient from "../clients/gql-client";
import { getCommonWebContent } from "../gql/queries";
import { dehydrate } from "@tanstack/react-query";
import { QueryProps, versions } from "../types";
import { getDataFromQueryKey } from "../utils/common-functions";
import { useRouter } from "next/router";

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

export default function Home({ queryProps }: { queryProps: QueryProps }) {
  const [_, setGlobalState] = useContext(AppContext);
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    setGlobalState((prevGlobalState: any) => {
      return { ...prevGlobalState, commonData: getDataFromQueryKey(["common-data"], queryProps.queries) };
    });
  }, [setGlobalState, queryProps]);
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
            imgURL="/assets/images/v1.png"
            imgAlt=""
            text="v1. Space by Gobind S."
            version="v1"
          />
          <Card
            link={`/v2/${redirectUrl}`}
            imgURL="/assets/images/reyna.jpg"
            imgAlt=""
            text="v2. Anime by Aishwarya T."
            version="v2"
          />
          <Card
            link={`/v3/${redirectUrl}`}
            imgURL="/assets/images/reyna.jpg"
            imgAlt=""
            text="v3. Neon by SaiRohit"
            version="v3"
          />
        </div>
        <p>Made with help and support from the whole Sketch team.</p>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await reactQueryClient.prefetchQuery({
    queryKey: ["common-data"],
    queryFn: gqlclient.request(getCommonWebContent) as any
  });
  return {
    props: {
      queryProps: dehydrate(reactQueryClient)
    }
  };
};
