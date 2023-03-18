import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Link from "next/link";
import gqlclient from "../../clients/gql-client";
import reactQueryClient from "../../clients/react-query-client";
import { getMembers } from "../../gql/queries";
import { QueryProps } from "../../types";
import { getDataFromQueryKey } from "../../utils/common-functions";
import Image from "next/image";
import React from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  async function getAlumini() {
    return await gqlclient.request(getMembers, {
      memType: "alumini",
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["alumini"],
    queryFn: getAlumini,
  });
  async function getHead() {
    return await gqlclient.request(getMembers, {
      memType: "head",
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["head"],
    queryFn: getHead,
  });
  async function getMember() {
    return await gqlclient.request(getMembers, {
      memType: "member",
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["member"],
    queryFn: getMember,
  });
  return {
    props: {
      qup: dehydrate(reactQueryClient),
    },
  };
};

export default function Members({ qup }: { qup: QueryProps }) {
  const Alumni = getDataFromQueryKey(["alumini"], qup.queries);
  console.log(Alumni);
}
