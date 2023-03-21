import { useCommonData } from "../../hooks";

import Lottie from "lottie-react";
import designJson from "../../public/assets/lottie/design_old.json";
import deliverJson from "../../public/assets/lottie/deliver_old.json";
import developJson from "../../public/assets/lottie/develop_old.json";
import Head from "next/head";

function AnimCard({ title, animData }: any) {
  return (
    <div className="anim">
      <h2>{title}</h2>
      <Lottie animationData={animData} />
    </div>
  );
}

export default function Home() {
  const { clubName, mission } = useCommonData();

  const anims = [
    { title: "Design", animData: designJson },
    { title: "Develop", animData: developJson },
    { title: "Deliver", animData: deliverJson }
  ];
  return (
    <section aria-label="Home" id="Home">
      <Head>
        <title>{`${clubName} | Home`}</title>
        <meta name="description" content="Welcome to sketch" />
      </Head>
      <div className="intro">
        <h1>{`Welcome to ${clubName}`}</h1>
        <p>{mission}</p>
      </div>
      <div className="anims">
        <span>Our workshops & events empower you to:</span>
        <div className="anims-container">
          {anims.map((anim, i) => (
            <AnimCard key={i} title={anim.title} animData={anim.animData} />
          ))}
        </div>
      </div>
    </section>
  );
}
