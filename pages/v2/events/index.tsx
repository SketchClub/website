import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Link from "next/link";
import gqlclient from "../../../clients/gql-client";
import reactQueryClient from "../../../clients/react-query-client";
import { getEvents } from "../../../gql/queries";
import { QueryProps } from "../../../types/global";
import { getDataFromQueryKey } from "../../../utils/common-functions";
import Image from "next/image";
import { formatDateAndTime } from "@contentful/f36-datetime";
import { useEffect } from "react";
import Head from "next/head";
import { EventType } from "../../../types/global";
// export interface Picture {
//   url: string;
// }
// export interface EventType {
//   title: string;
//   description: string;
//   smallDescription: string;
//   date: Date;
//   picture: Picture;
// }

function Card({
  name,
  picurl,
  description,
  date,
}: {
  name: string;
  picurl: string;
  description: string;
  date: string;
}) {
  return (
    <Link href={`/events/${name.replaceAll(" ", "-")}`} className="cardu">
      <div className="img-container">
        <Image src={picurl} alt="event-photo" fill sizes="100%" />
      </div>
      <div className="stuff-container">
        <h3>{name}</h3>
        <span
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "15ch",
          }}
        >
          {description}
        </span>
        <span>{formatDateAndTime(date, "day")}</span>
      </div>
    </Link>
  );
}

function Cardpast({ name, picurl }: { name: string; picurl: string }) {
  return (
    <Link href={`/v2/events/${name.replaceAll(" ", "-")}`} className="cardp">
      <div className="img-container">
        <Image src={picurl} alt="event-photo" fill sizes="100%" />
      </div>
      <div className="stuff-container">
        <h3>{name}</h3>
      </div>
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
  useEffect(() => {
    const h2 = (document.querySelector("#events h2") as HTMLElement) || null;
    var tagWidth = h2.offsetWidth;
    h2.onmousemove = (e) => {
      var percent = (e.x / tagWidth) * 255;
      if (h2 != null) {
        h2.style.color = `hsl(${percent},100%,50%)`;
        h2.style.textShadow = `0 0 8px hsl(${percent},100%,50%)`;
      }
    };
    h2.onmouseleave = (e) => {
      h2.style.color = "white";
      h2.style.textShadow = "0 0 0px black";
    };
  });
  return (
    <section id="events">
      <Head>
        <title>Events of Sketch</title>
      </Head>
      <div className="heading">
        <h2>Ninja Wars !</h2>
        <Image fill src="/assets/v2/sbg.jpg" alt="" className="bg-img" />
      </div>
      <div className="events-container">
        {upcomingEvents.length !== 0 && (
          <>
            <div className="upcomings">
              <h3>Upcoming</h3>
              <div className="cards-container">
                {upcomingEvents.map((event: any, index: number) => {
                  return (
                    <Card
                      name={event.title}
                      picurl={event.picture.url}
                      description={event.smallDescription}
                      date={event.date}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
        {pastEvents.length !== 0 && (
          <>
            <div className="pasts">
              <h3>Past</h3>
              <div className="cards-container">
                {pastEvents.map((event: any, index: number) => {
                  return (
                    <Cardpast
                      name={event.title}
                      picurl={event.picture.url}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

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
