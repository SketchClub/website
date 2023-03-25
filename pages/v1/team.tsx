import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import gqlclient from "../../clients/gql-client";
import reactQueryClient from "../../clients/react-query-client";
import { getMembers } from "../../gql/queries";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { getDataFromQueryKey } from "../../utils/common-functions";
import { QueryProps } from "../../types/global";

export const getServerSideProps: GetServerSideProps = async () => {
  async function getHeads() {
    return await gqlclient.request(getMembers, {
      memType: "head",
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["head"],
    queryFn: getHeads,
  });
  async function getMemberDetails() {
    return await gqlclient.request(getMembers, {
      memType: "member",
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["member"],
    queryFn: getMemberDetails,
  });
  async function getAlumni() {
    return await gqlclient.request(getMembers, {
      memType: "alumini",
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["alumini"],
    queryFn: getAlumni,
  });
  return {
    props: {
      qup: dehydrate(reactQueryClient),
    },
  };
};

function AllMemCard({
  name,
  mail,
  insta,
  url,
}: {
  name: string;
  mail: string;
  insta: string;
  url: string;
}) {
  return (
    <div className="card">
      <div className="img-container">
        <Image src={url} alt="alt" fill sizes="100%" />
      </div>
      <div className="socials-container">
        <a
          href={`https://www.instagram.com/` + insta}
          className="socials insta circle"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillInstagram />
        </a>
        <h3>{name.split(" ")[0]}</h3>
        <a
          href={"mailto:" + mail}
          className="socials mail circle"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsFillEnvelopeFill />
        </a>
      </div>
    </div>
  );
}

export default function Team({ qup }: { qup: QueryProps }) {
  const heads = getDataFromQueryKey(["head"], qup.queries).items;
  const alumni = getDataFromQueryKey(["alumini"], qup.queries).items;
  const members = getDataFromQueryKey(["member"], qup.queries).items;

  return (
    <section id="members">
      <h1>Meet the fam</h1>
      <div className="all-memb-container heads">
        <h1>Kage</h1>
        <div className="cards-container">
          {heads.map((type: any, index: number) => {
            return (
              <AllMemCard
                name={type.name}
                url={type.profilePicture.url}
                mail={type.mail}
                insta={type.insta}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className="all-memb-container members">
        <h1>Jōnin</h1>
        <div className="cards-container">
          {members.map((type: any, index: number) => {
            return (
              <AllMemCard
                name={type.name}
                url={type.profilePicture.url}
                mail={type.mail}
                insta={type.insta}
                key={index}
              />
            );
          })}
        </div>
      </div>
      {alumni.length !== 0 && (
        <div className="all-memb-container alumini">
          <h1>Jinchūriki</h1>
          <div className="cards-container">
            {alumni.map((type: any, index: number) => {
              return (
                <AllMemCard
                  name={type.name}
                  url={type.profilePicture.url}
                  mail={type.mail}
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
