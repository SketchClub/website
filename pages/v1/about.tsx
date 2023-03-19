import Head from "next/head";
import Link from "next/link";
import { useCommonData } from "../../hooks";
import { BsPersonPlusFill } from "react-icons/bs";
import designAni from "../../public/assets/lottie/design_old.json";
import developAni from "../../public/assets/lottie/develop_old.json";
import deliverAni from "../../public/assets/lottie/deliver_old.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"));

export default function About() {
  const { aboutIntro, design, develop, deliver, clubName } = useCommonData();

  const textsAndAnis: any[] = [
    ["Design", design, designAni],
    ["Develop", develop, developAni],
    ["Deliver", deliver, deliverAni]
  ];
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
        <Link href="/v1/join" style={{ width: "fit-content" }} aria-label="Join us">
          <button id="btn_join_about" type="button">
            Join us
            <BsPersonPlusFill style={{ marginLeft: "7px" }} />
          </button>
        </Link>
      </div>
      <div className="text-and-anis">
        {textsAndAnis.map((data, index) => {
          return (
            <div className="card black-text-outline" key={index}>
              <div className={"text " + "text" + (index + 1)}>
                <h2>{data[0]}</h2>
                <p>{data[1]}</p>
              </div>
              <Lottie animationData={data[2]} autoPlay loop className={"lottie " + "ani" + (index + 1)} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
