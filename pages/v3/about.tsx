import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import React, { useEffect } from "react";
import gqlclient from "../../clients/gql-client";
import reactQueryClient from "../../clients/react-query-client";
import { QueryProps } from "../../types";
import { getDataFromQueryKey } from "../../utils/common-functions";
import designJson from "../../public/assets/lottie/design_old.json";
import deliverJson from "../../public/assets/lottie/deliver_old.json";
import developJson from "../../public/assets/lottie/develop_old.json";

export default function Home() {
  return (
    <section id="about">
      <h1 data-text="About">About</h1>
      <div className="about-container">
        <div className="img-container">
          <Image
            src="/assets/images/reyna.jpg"
            className="nature-img"
            alt="nature"
            fill
          ></Image>
        </div>
        <div className="text-container">
          <h2>Vision</h2>
          <p>{""}</p>
          <div className="stats">
            <span>40 members</span>
            <span>1 mentor</span>
          </div>
          <Link href="https://www.google.co.in/">
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
            <p>{""}</p>
          </div>
          <Lottie className="lottie-anim design" animationData={designJson} />
        </div>
        <div className="anim-card">
          <div className="anim-text">
            <h2>Develop</h2>
            <p>{""}</p>
          </div>
          <Lottie className="lottie-anim develop" animationData={developJson} />
        </div>
        <div className="anim-card">
          <div className="anim-text">
            <h2>Deliver</h2>
            <p>{""}</p>
          </div>
          <Lottie className="lottie-anim deliver" animationData={deliverJson} />
        </div>
      </div>
    </section>
  );
}
