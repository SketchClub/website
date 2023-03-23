import { useCommonData } from "../../hooks";

import Head from "next/head";
import { BsArrowBarRight } from "react-icons/bs";
import Link from "next/link";
import dynamic from "next/dynamic";

const DesignLottie = dynamic(() => import("../../components/common/lottie").then((mod) => mod.DesignLottie));
const DevelopLottie = dynamic(() => import("../../components/common/lottie").then((mod) => mod.DevelopLottie));
const DeliverLottie = dynamic(() => import("../../components/common/lottie").then((mod) => mod.DeliverLottie));

export default function Home() {
  const { clubName, mission, footerText } = useCommonData();
  return (
    <section aria-label="Home" id="Home">
      <Head>
        <title>{`${clubName} | Home`}</title>
        <meta name="description" content="Welcome to sketch" />
      </Head>
      <div className="intro">
        <h1>{`Welcome to ${clubName}`}</h1>
        <p>{mission}</p>
        <p>{footerText}</p>
        <Link href={"/v1/about"}>
          <button>
            <span>Explore us</span>
            <BsArrowBarRight />
          </button>
        </Link>
      </div>
      <div className="anims">
        <span>Our workshops & events empower you to:</span>
        <div className="anims-container">
          <div className="anim">
            <h2>Design</h2>
            <DesignLottie />
          </div>
          <div className="anim">
            <h2>Develop</h2>
            <DevelopLottie />
          </div>
          <div className="anim">
            <h2>Deliver</h2>
            <DeliverLottie />
          </div>
        </div>
      </div>
    </section>
  );
}
