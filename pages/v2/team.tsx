import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import gqlclient from "../../clients/gql-client";
import reactQueryClient from "../../clients/react-query-client";
import { getMembers } from "../../gql/queries";
import { QueryProps } from "../../types";
import { getDataFromQueryKey } from "../../utils/common-functions";
import Image from "next/image";
import React from "react";
import { AiFillInstagram, AiFillMail } from "react-icons/ai";
import Head from "next/head";
import { useEffect } from "react";

function Card({
  name,
  picurl,
  domain,
  mail,
  insta,
  tag
}: {
  name: string;
  picurl: string;
  domain: string;
  mail: string;
  insta: string;
  tag: string;
}) {
  return (
    <li className="card">
      <h3>{name.split(" ")[0]}</h3>
      <span className="tag">{tag}</span>
      <span className="domain">{domain}</span>
      <div className="img-container">
        <Image src={picurl} alt="profile-photo" fill sizes="100%" />
      </div>
      <div className="icon-container">
        <a href={"https://instagram.com/" + insta} className="insta" target="_blank" rel="noopener noreferrer">
          <AiFillInstagram />
        </a>
        <a href={"mailto:" + mail} className="mail" target="_blank" rel="noopener noreferrer">
          <AiFillMail />
        </a>
      </div>
    </li>
  );
}

export default function Members({ qup }: { qup: QueryProps }) {
  const heads = getDataFromQueryKey(["head"], qup.queries).items;
  const alumini = getDataFromQueryKey(["alumini"], qup.queries).items;
  const members = getDataFromQueryKey(["member"], qup.queries).items;
  useEffect(() => {
    const h1 = (document.querySelector("#member h1") as HTMLElement) || null;
    var tagWidth = h1.offsetWidth;
    h1.onmousemove = (e) => {
      var percent = (e.x / tagWidth) * 255;
      if (h1 != null) {
        h1.style.color = `hsl(${percent},100%,50%)`;
        h1.style.textShadow = `0 0 8px hsl(${percent},100%,50%)`;
      }
    };
    h1.onmouseleave = (e) => {
      h1.style.color = "white";
      h1.style.textShadow = "0 0 0px black";
    };
  });
  return (
    <section id="member">
      <Head>
        <title>Members of Sketch</title>
      </Head>
      <h1>The Shinobi</h1>
      <div className="member-container">
        <div className="head member-type">
          <h2 className="title">Kage</h2>
          <ul className="cards-container">
            {heads.map((head: any, index: number) => {
              console.log(head);
              return (
                <Card
                  name={head.name}
                  picurl={head.profilePicture.url}
                  domain={head.domain.title}
                  mail={head.mail}
                  insta={head.insta}
                  tag={head.tag}
                  key={index}
                />
              );
            })}
          </ul>
        </div>
        <div className="members member-type">
          <h2 className="title">Jōnin</h2>
          <ul className="cards-container">
            {members.map((member: any, index: number) => {
              return (
                <Card
                  name={member.name}
                  picurl={member.profilePicture.url}
                  domain={member.domain.title}
                  mail={member.mail}
                  insta={member.insta}
                  tag={member.tag}
                  key={index}
                />
              );
            })}
          </ul>
        </div>
        <div className="alumini member-type">
          <h2 className="title"> Jinchūriki</h2>
          <ul className="cards-container">
            {alumini.map((alumini: any, index: number) => {
              return (
                <Card
                  name={alumini.name}
                  picurl={alumini.profilePicture.url}
                  domain={alumini.domain.title}
                  mail={alumini.mail}
                  insta={alumini.insta}
                  tag={alumini.tag}
                  key={index}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  async function getHeads() {
    return await gqlclient.request(getMembers, {
      memType: "head"
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["head"],
    queryFn: getHeads
  });
  async function getAlumini() {
    return await gqlclient.request(getMembers, {
      memType: "alumini"
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["alumini"],
    queryFn: getAlumini
  });
  async function getMemberDetails() {
    return await gqlclient.request(getMembers, {
      memType: "member"
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["member"],
    queryFn: getMemberDetails
  });
  return {
    props: {
      qup: dehydrate(reactQueryClient)
    }
  };
};
