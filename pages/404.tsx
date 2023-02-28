import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { mainRoutes } from "../utils/common-consts";
import { isStringInArray } from "../utils/common-functions";
import Error from "../components/Error";

export default function NotFound() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  useEffect(() => {
    const currentRoute = ((router.asPath as string) ?? "").replace("/", "");
    if (isStringInArray(currentRoute.split("/")[0], mainRoutes)) {
      router.push({ pathname: "/", query: { to: currentRoute } });
    } else {
      setIsLoading(false);
    }
    return () => {
      setIsLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isLoading ? <>...</> : <Error statusCode={404} />;
}
