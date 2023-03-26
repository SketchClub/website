import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCommonData } from "../../hooks";
const DesignLottie = dynamic(() =>
  import("../../components/common/lottie").then((mod) => mod.DesignLottie)
);
const DevelopLottie = dynamic(() =>
  import("../../components/common/lottie").then((mod) => mod.DevelopLottie)
);
const DeliverLottie = dynamic(() =>
  import("../../components/common/lottie").then((mod) => mod.DeliverLottie)
);

export default function About() {
  const {
    design,
    deliver,
    develop,
    mission,
    instagram,
    numOfAlumni,
    numOfMembers,
    clubName,
  } = useCommonData();
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
      <h1 data-text="About">About</h1>
      <div className="about-container">
        <div className="img-container">
          <Image
            src="/assets/images/sketch_fam.jpg"
            className="nature-img"
            alt="nature"
            fill
          ></Image>
        </div>
        <div className="text-container">
          <h2>Vision</h2>
          <p>{mission}</p>
          <div className="stats">
            <span>{numOfMembers} Members</span>
            <span>{numOfAlumni} Alumni</span>
          </div>
          <Link href={`https://www.instagram.com/` + instagram}>
            <button type="button" className="button">
              Join Us
            </button>
          </Link>
        </div>
      </div>
      <div className="moto-container">
        <div className="anim-card">
          <div className="anim-text">
            <h2>Design</h2>
            <p>{design}</p>
          </div>
          <DesignLottie />
        </div>
        <div className="anim-card">
          <div className="anim-text">
            <h2>Develop</h2>
            <p>{develop}</p>
          </div>
          <DevelopLottie />
        </div>
        <div className="anim-card">
          <div className="anim-text">
            <h2>Deliver</h2>
            <p>{deliver}</p>
          </div>
          <DeliverLottie />
        </div>
      </div>
    </section>
  );
}
