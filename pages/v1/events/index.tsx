import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Link from "next/link";
import gqlclient from "../../../clients/gql-client";
import reactQueryClient from "../../../clients/react-query-client";
import { getEvents } from "../../../gql/queries";
import { QueryProps } from "../../../types/global";
import { getDataFromQueryKey } from "../../../utils/common-functions";
import { EventType } from "../../../types/global";
import Image from "next/image";
import React from "react";
import { formatDateAndTime } from "@contentful/f36-datetime";

export const getServerSideProps: GetServerSideProps = async () => {
  async function getPastEvents() {
    return await gqlclient.request(getEvents, {
      eventType: "past",
      wantDesc: true,
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["events", "past"],
    queryFn: getPastEvents,
  });
  async function getUpcomingEvents() {
    return await gqlclient.request(getEvents, {
      eventType: "upcoming",
      wantDesc: true,
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["events", "upcoming"],
    queryFn: getUpcomingEvents,
  });
  return {
    props: {
      qup: dehydrate(reactQueryClient),
    },
  };
};

function EventsComponent({
  title,
  picUrl,
}: {
  title: string;
  date: string;
  smallDescription: string;
  picUrl: string;
}) {
  return (
    <Link
      className="event-card-container"
      href={`/v1/events/${title.replaceAll(" ", "-")}`}
    >
      <div className="img-container">
        <Image src={picUrl} alt="event" fill />
      </div>
      <h3>{title}</h3>
    </Link>
  );
}

export default function Events({ qup }: { qup: QueryProps }) {
  const pastEvents: EventType[] = getDataFromQueryKey(
    ["events", "past"],
    qup.queries
  ).items;
  const upcomingEvents: EventType[] = getDataFromQueryKey(
    ["events", "upcoming"],
    qup.queries
  ).items;

  return (
    <section id="all-events">
      {upcomingEvents.length !== 0 && (
        <React.Fragment>
          <div className="all-event-container upcoming">
            <h2>Upcoming Events</h2>
            {upcomingEvents.map((type: any, index: number) => {
              return (
                <EventsComponent
                  title={type.title}
                  picUrl={type.picture.url}
                  date={type.date}
                  smallDescription={type.smallDescription}
                  key={index}
                />
              );
            })}
          </div>
        </React.Fragment>
      )}
      {pastEvents.length !== 0 && (
        <>
          <div className="all-event-container past">
            <h2>Past Events</h2>
            <div className="event-cards">
              {pastEvents.map((type: any, index: number) => {
                return (
                  <EventsComponent
                    title={type.title}
                    picUrl={type.picture.url}
                    date={type.date}
                    smallDescription={type.smallDescription}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
