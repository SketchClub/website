import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import designJson from "../../public/assets/lottie/design_old.json";
import deliverJson from "../../public/assets/lottie/deliver_old.json";
import developJson from "../../public/assets/lottie/develop_old.json";
import { useCommonData } from "../../hooks";

export default function About() {
  const {
    design,
    deliver,
    develop,
    mission,
    instagram,
    numOfAlumni,
    numOfMembers,
  } = useCommonData();
  return (
    <section id="about">
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
          <Lottie className="lottie-anim design" animationData={designJson} />
        </div>
        <div className="anim-card">
          <div className="anim-text">
            <h2>Develop</h2>
            <p>{develop}</p>
          </div>
          <Lottie className="lottie-anim develop" animationData={developJson} />
        </div>
        <div className="anim-card">
          <div className="anim-text">
            <h2>Deliver</h2>
            <p>{deliver}</p>
          </div>
          <Lottie className="lottie-anim deliver" animationData={deliverJson} />
        </div>
      </div>
    </section>
  );
}
