import { default as NextError } from "next/error";
export default function Error({ statusCode }: { statusCode: string | number }) {
  switch (statusCode) {
    case "event-not-found":
      return <>Event not found</>;
    default:
      if (typeof statusCode == "number") {
        return <NextError statusCode={statusCode} />;
      }
      return <>pata ni konsa error</>;
  }
}
