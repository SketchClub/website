import Lottie from "lottie-react";
import errorjson from "../public/assets/lottie/error.json"
export default function Error({ statusCode }: { statusCode?: string | number }) {
  switch (statusCode) {
    case "event-not-found":
      console.log("<>Event not found</>");
      break;
    case "route-error":
      console.log("<>Route error</>");
      break;
    default:
      console.log("<>Pata nahi konsa error</>");
      break;
  }
  return <section id="main-error-component"><Lottie animationData={errorjson} id="lottie"></Lottie></section>;
}
