import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import gqlclient from "../../../clients/gql-client";
import reactQueryClient from "../../../clients/react-query-client";
import { getSingleEvent } from "../../../gql/queries";
import { QueryProps } from "../../../types";
import { getDataFromQueryKey } from "../../../utils/common-functions";

export default function Event({ qp }: { qp: QueryProps }) {
  const router = useRouter();
  const temp = router.asPath.split("/");
  const items = getDataFromQueryKey(["event", temp[temp.length - 1]], qp.queries)?.items;

  if (items === undefined) {
    return <>Fuck you</>;
  }
  if (items.length == 0) {
    return <>Fuck you</>;
  }
  const data = items[0];
  return <div>Event</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const url = (query.event as string) ?? "event";
  async function getPastEvents() {
    return await gqlclient.request(getSingleEvent, { eventTitle: url.replaceAll("-", " ") });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["event", url],
    queryFn: getPastEvents
  });
  return {
    props: {
      qp: dehydrate(reactQueryClient)
    }
  };
};
