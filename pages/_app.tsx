import "../styles/style.scss";
import { QueryClientProvider, Hydrate, dehydrate } from "@tanstack/react-query";
import type { AppContext as NextAppContext, AppProps } from "next/app";
import { useState, createContext, useEffect, Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import reactQueryClient from "../clients/react-query-client";
import logoText from "../utils/logo-text";
import type { AppContextState } from "../types/global";
import { versions as versionConst } from "../utils/common-consts";
import gqlclient from "../clients/gql-client";
import { getCommonWebContent, getDomainNames } from "../gql/queries";
import { getDataFromQueryKey } from "../utils/common-functions";
import Loading from "../components/Loading";
import Error from "../components/Error";

export const init: AppContextState = { version: null, commonData: null };

export const AppContext = createContext<[AppContextState, Dispatch<SetStateAction<AppContextState>>]>([
  init,
  () => init
]);
const V1_Header = dynamic(() => import("../components/v1/Header"));
const V1_Footer = dynamic(() => import("../components/v1/Footer"));

const V2_Header = dynamic(() => import("../components/v2/Header"));
const V2_Footer = dynamic(() => import("../components/v2/Footer"));

const V3_Header = dynamic(() => import("../components/v3/Header"));
const V3_Footer = dynamic(() => import("../components/v3/Footer"));

interface MyProps extends AppProps {
  mainQuery: any;
}
export default function App({ Component, pageProps, mainQuery }: MyProps) {
  const cmd = getDataFromQueryKey(["common-data"], mainQuery?.queries ?? []);
  const [globalState, setGlobalState] = useState<AppContextState>({
    version: null,
    commonData: cmd
  });
  const [isRouteChanging, setIsRouteChanging] = useState<boolean>(false);
  const [isRouteError, setIsRouteError] = useState<boolean>(false);
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
    router.events.on("routeChangeStart", () => {
      setIsRouteChanging(true);
    });
    router.events.on("routeChangeComplete", () => {
      setIsRouteChanging(false);
    });
    router.events.on("routeChangeError", () => {
      setIsRouteError(true);
    });
  }, [router]);
  useEffect(() => {
    if (versionConst.indexOf(router.pathname.split("/")[1]) > -1)
      setGlobalState((prevGlobalState) => ({
        ...prevGlobalState,
        version: router.pathname.split("/")[1] as any
      }));
    if (router.asPath == "/") {
      setGlobalState((prevGlobalState) => ({
        ...prevGlobalState,
        version: null
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
        <Hydrate state={pageProps?.dehydratedState}>
          <AppContext.Provider value={[globalState, setGlobalState]}>
            {globalState.version == "v1" && <V1_Header />}
            {globalState.version == "v2" && <V2_Header />}
            {globalState.version == "v3" && <V3_Header />}
            {isRouteError ? (
              <Error statusCode={"route-error"} />
            ) : isRouteChanging ? (
              <Loading />
            ) : (
              <Component {...pageProps} />
            )}
            {globalState.version == "v1" && <V1_Footer />}
            {globalState.version == "v2" && <V2_Footer />}
            {globalState.version == "v3" && <V3_Footer />}
          </AppContext.Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

App.getInitialProps = async (ctx: NextAppContext) => {
  async function getHomeDetails() {
    try {
      const comData: Record<string, any> = await gqlclient.request(getCommonWebContent);
      const domainsCollection: Record<string, any> = await gqlclient.request(getDomainNames);
      const domains: string[] = [];
      (domainsCollection?.domainCollection?.items ?? []).forEach((domainObj: Record<string, string>) => {
        domains.push(Object.values(domainObj)[0]);
      });
      const forReturn = {
        items: {
          ...(comData?.webContentCollection?.items[0] ?? {}),
          domains: domains
        }
      };
      return forReturn;
    } catch {
      return {
        items: undefined
      };
    }
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["common-data"],
    queryFn: getHomeDetails
  });
  return {
    Component: ctx.Component,
    pageProps: {},
    mainQuery: dehydrate(reactQueryClient)
  };
};
