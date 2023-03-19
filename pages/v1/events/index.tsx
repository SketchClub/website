import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Link from "next/link";
import gqlclient from "../../../clients/gql-client";
import reactQueryClient from "../../../clients/react-query-client";
import { getEvents } from "../../../gql/queries";
import { QueryProps } from "../../../types";
import { getDataFromQueryKey } from "../../../utils/common-functions";

export default function events({ qup }: { qup: QueryProps }) {
  const pastEvents = getDataFromQueryKey(["events", "past"], qup.queries);
  const upcomingEvents = getDataFromQueryKey(["events", "upcoming"], qup.queries);
  return <Link href="/v1/events/let's-dev">Event</Link>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  async function getPastEvents() {
    return await gqlclient.request(getEvents, {
      eventType: "past",
      wantDesc: true
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["events", "past"],
    queryFn: getPastEvents
  });
  async function getUpcomingEvents() {
    return await gqlclient.request(getEvents, {
      eventType: "upcoming",
      wantDesc: true
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["events", "upcoming"],
    queryFn: getUpcomingEvents
  });
  return {
    props: {
      qup: dehydrate(reactQueryClient)
    }
  };
};
