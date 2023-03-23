import Head from "next/head";
import Link from "next/link";
import { useCommonData } from "../../hooks";
import { BsPersonPlusFill } from "react-icons/bs";
import dynamic from "next/dynamic";

const DesignLottie = dynamic(() => import("../../components/common/lottie").then((mod) => mod.DesignLottie));
const DevelopLottie = dynamic(() => import("../../components/common/lottie").then((mod) => mod.DevelopLottie));
const DeliverLottie = dynamic(() => import("../../components/common/lottie").then((mod) => mod.DeliverLottie));

export default function About() {
  const { aboutIntro, design, develop, deliver, clubName, instagram } = useCommonData();

  return (
    <section id="about">
      <Head>
        <title>{`${clubName} | About`}</title>
        <meta name="description" content="About SKETCH CLUB | SRM RAMAPURAM" />
        <meta
          name="keywords"
          content="sketch, sketch club, club, srm, ramapuram, srm ramapuram, sketch club srm, sketch srm, club srm, about sketch club, about"
        />
      </Head>
      <div className="intro">
        <h1 className="black-text-outline">We{`'`}re Sketch!</h1>
        {aboutIntro.split("\n").map((para, index) => {
          return (
            <p key={index} className="black-text-outline">
              {para}
            </p>
          );
        })}
        <a href={`https://instagram.com/${instagram}`} aria-label="Join us" target="_blank" rel="noopener noreferrer">
          <button id="btn_join_about" type="button">
            Join us
            <BsPersonPlusFill style={{ marginLeft: "7px" }} />
          </button>
        </a>
      </div>
      <div className="text-and-anis">
        <div className="card black-text-outline">
          <div className={"text " + "text" + 1}>
            <h2>Design</h2>
            <p>{design}</p>
          </div>
          <DesignLottie className={"lottie " + "ani" + 1} />
        </div>
        <div className="card black-text-outline">
          <div className={"text " + "text" + 2}>
            <h2>Develop</h2>
            <p>{develop}</p>
          </div>
          <DevelopLottie className={"lottie " + "ani" + 2} />
        </div>
        <div className="card black-text-outline">
          <div className={"text " + "text" + 3}>
            <h2>Deliver</h2>
            <p>{deliver}</p>
          </div>
          <DeliverLottie className={"lottie " + "ani" + 3} />
        </div>
      </div>
    </section>
  );
}
