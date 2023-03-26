import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import gqlclient from "../../clients/gql-client";
import reactQueryClient from "../../clients/react-query-client";
import { getMembers } from "../../gql/queries";
import { QueryProps } from "../../types/global";
import { getDataFromQueryKey } from "../../utils/common-functions";
import Image from "next/image";
import React from "react";
import { FaCameraRetro, FaDev, FaHandsHelping, FaPaintBrush, FaPencilAlt } from "react-icons/fa";
import { FiInstagram, FiMail } from "react-icons/fi";

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

function Outline({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 850 850" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M607.5 25H193L98 178.5V725.5L193 826H295.5L349 778H495.5L547 826H752V178.5L710 122H677V96.5L645 72V52.5L607.5 25Z"
        stroke="white"
        strokeWidth="10"
      />
      <path d="M102.5 664V465.5L151.5 512V617.5L102.5 664Z" stroke="white" strokeWidth="10" />

      <path d="M749.5 404.5V210.5L702.5 255.946V359.054L749.5 404.5Z" stroke="white" strokeWidth="10" />
    </svg>
  );
}

function Card({
  name,
  mail,
  insta,
  tag,
  url,
  domain
}: {
  name: string;
  mail: string;
  insta: string;
  tag: string;
  url: string;
  domain: string;
}) {
  var newDomain: any;
  switch (domain.toLowerCase().replaceAll(" ", "_")) {
    case "content":
      newDomain = <FaPencilAlt />;
      break;
    case "design":
      newDomain = <FaPaintBrush />;
      break;
    case "r&d":
      newDomain = <FaDev />;
      break;
    case "pr_&_organization":
      newDomain = <FaHandsHelping />;
      break;
    case "media":
      newDomain = <FaCameraRetro />;
      break;
  }

  return (
    <div className="card">
      <Outline className="svg-card" />
      <div className="img-container">
        <Image src={url} alt="alt" fill sizes="100%" />
      </div>
      <h3>{name.split(" ")[0]}</h3>
      <span className="tag">{tag}</span>
      <div className="socials-container">
        <a
          href={`https://www.instagram.com/` + insta}
          className="socials insta circle"
          target="_blank"
          rel="noopener noreferrer"
          title="Sketch Instagram"
        >
          <FiInstagram />
        </a>
        <a
          href={"mailto:" + mail}
          className="socials mail circle"
          target="_blank"
          rel="noopener noreferrer"
          title="Sketch E-mail"
        >
          <FiMail />
        </a>
      </div>
      <div className="domain circle">{newDomain}</div>
    </div>
  );
}

export default function Members({ qup }: { qup: QueryProps }) {
  const heads = getDataFromQueryKey(["head"], qup.queries).items;
  const alumni = getDataFromQueryKey(["alumini"], qup.queries).items;
  const members = getDataFromQueryKey(["member"], qup.queries).items;
  return (
    <section id="members">
      <h1 data-text="Meet the fam">Meet the fam</h1>
      <div className="all-memb-container heads">
        <h2>heads</h2>
        <div className="cards-container">
          {heads.map((type: any, index: number) => {
            return (
              <Card
                name={type.name}
                url={type.profilePicture.url}
                tag={type.tag}
                mail={type.mail}
                domain={type.domain.title}
                insta={type.insta}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className="all-memb-container members">
        <h2>Members</h2>
        <div className="cards-container">
          {members.map((type: any, index: number) => {
            return (
              <Card
                name={type.name}
                url={type.profilePicture.url}
                tag={type.tag}
                mail={type.mail}
                domain={type.domain.title}
                insta={type.insta}
                key={index}
              />
            );
          })}
        </div>
      </div>
      {alumni.length !== 0 && (
        <div className="all-memb-container alumini">
          <h2>Alumini</h2>
          <div className="cards-container">
            {alumni.map((type: any, index: number) => {
              return (
                <Card
                  name={type.name}
                  url={type.profilePicture.url}
                  tag={type.tag}
                  mail={type.mail}
                  domain={type.domain.title}
                  insta={type.insta}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
