import React from "react";
import Lottie from "lottie-react";
import Loadingjson from "../public/assets/lottie/caterpLoad.json";

export default function Loading() {
  return <section id="main-loading-component">
    <Lottie animationData={Loadingjson} id="lottie">
    </Lottie>
  </section>;
}
