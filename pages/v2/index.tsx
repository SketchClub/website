import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import gqlclient from "../../clients/gql-client";
import reactQueryClient from "../../clients/react-query-client";
import { getCommonWebContent } from "../../gql/queries";
import { QueryProps } from "../../types";
import { getDataFromQueryKey } from "../../utils/common-functions";

export default function index({ queryProps }: { queryProps: QueryProps }) {
  const cmd = getDataFromQueryKey(["common-data"], queryProps.queries);
  console.log(cmd);
}

export const getServerSideProps: GetServerSideProps = async () => {
  async function getCommonData() {
    return await gqlclient.request(getCommonWebContent);
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["common-data"],
    queryFn: getCommonData,
  });
  return {
    props: {
      queryProps: dehydrate(reactQueryClient),
    },
  };
};
