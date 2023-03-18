import "../styles/style.css";

import { QueryClientProvider, Hydrate, dehydrate } from "@tanstack/react-query";

import type { AppProps } from "next/app";

import {
  useState,
  createContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import reactQueryClient from "../clients/react-query-client";
import logoText from "../utils/logo-text";
import { AppContextState } from "../types";
import { versions as versionConst } from "../utils/common-consts";
import { GetServerSideProps } from "next";
import gqlclient from "../clients/gql-client";
import { getCommonWebContent, getDomainNames } from "../gql/queries";

const init: AppContextState = { version: null, commonData: null };

export const AppContext = createContext<
  [AppContextState, Dispatch<SetStateAction<AppContextState>>]
>([init, () => init]);
const V1_Header = dynamic(() => import("../components/v1/Header"));
const V1_Footer = dynamic(() => import("../components/v1/Footer"));

const V2_Header = dynamic(() => import("../components/v2/Header"));
const V2_Footer = dynamic(() => import("../components/v2/Footer"));

const V3_Header = dynamic(() => import("../components/v3/Header"));
const V3_Footer = dynamic(() => import("../components/v3/Footer"));

export default function App({ Component, pageProps }: AppProps) {
  console.log("this", pageProps);
  const [globalState, setGlobalState] = useState<AppContextState>(init);
  const router = useRouter();
  useEffect(() => {
    switch (globalState.version) {
      case "v1":
        document.body.classList.remove("v1", "v2", "v3");
        document.body.classList.add("v1");
        break;
      case "v2":
        document.body.classList.remove("v1", "v2", "v3");
        document.body.classList.add("v2");
        break;
      case "v3":
        document.body.classList.remove("v1", "v2", "v3");
        document.body.classList.add("v3");
        break;
      default:
        document.body.classList.remove("v1", "v2", "v3");
        break;
    }
  }, [globalState]);
  useEffect(() => {
    if (versionConst.indexOf(router.pathname.split("/")[1]) > -1)
      setGlobalState((prevGlobalState) => ({
        ...prevGlobalState,
        version: router.pathname.split("/")[1] as any,
      }));
    if (router.asPath == "/") {
      setGlobalState((prevGlobalState) => ({
        ...prevGlobalState,
        version: null,
      }));
    }
  }, [router]);
  useEffect(() => {
    console.log(logoText);
    return () => {
      console.clear();
    };
  }, []);
  return (
    <>
      <QueryClientProvider client={reactQueryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppContext.Provider value={[globalState, setGlobalState]}>
            {globalState.version == "v1" && <V1_Header />}
            {globalState.version == "v2" && <V2_Header />}
            {globalState.version == "v3" && <V3_Header />}
            <Component {...pageProps} />
            {globalState.version == "v1" && <V1_Footer />}
            {globalState.version == "v2" && <V2_Footer />}
            {globalState.version == "v3" && <V3_Footer />}
          </AppContext.Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  async function getHomeDetails() {
    try {
      const comData = await gqlclient.request(getCommonWebContent);
      const domains = await gqlclient.request(getDomainNames);
      return { ...comData, domains: { ...domains } };
    } catch {
      return {};
    }
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["common-data"],
    queryFn: getHomeDetails,
  });
  return {
    props: {
      mainQuery: dehydrate(reactQueryClient),
    },
  };
};
