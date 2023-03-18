import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Link from "next/link";
import gqlclient from "../../../clients/gql-client";
import reactQueryClient from "../../../clients/react-query-client";
import { getEvents, getSingleEvent } from "../../../gql/queries";
import { QueryProps } from "../../../types";
import { getDataFromQueryKey } from "../../../utils/common-functions";
import { EventType } from "../types";
import Image from "next/image";
import React from "react";
import { formatDateAndTime } from "@contentful/f36-datetime";

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const eventTitle = await gqlclient.request(getEventTitle, {
//     eventTitle: String(query.event).replaceAll("-", " "),
//   });
//   const event = eventTitle.eventCollection.items;
//   return {
//     props: { data: event },
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.query.event ?? "undefined";
  async function getEventName(query: any) {
    return await gqlclient.request(getSingleEvent, {
      eventTitle: String(query.event).replaceAll("-", " "),
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["event", name],
    queryFn: getEventName,
  });
  return {
    props: {
      qup: dehydrate(reactQueryClient),
    },
  };
  return { props: {} };
};

export default function Event() {
  // console.log("this is qup-queries", qup.queries);
  return <></>;
}
