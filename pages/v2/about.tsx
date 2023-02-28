import { useRouter } from "next/router";
import { useEffect } from "react";

export default function About() {
  const router = useRouter();
  useEffect(() => {
    router.push("/v2/#about");
  }, [router]);
  return <></>;
}
