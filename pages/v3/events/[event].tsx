import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import gqlclient from "../../../clients/gql-client";
import reactQueryClient from "../../../clients/react-query-client";
import {
  documentToReactComponents,
  NodeRenderer,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { getSingleEvent } from "../../../gql/queries";
import { QueryProps } from "../../../types/global";
import { getDataFromQueryKey } from "../../../utils/common-functions";
import Image from "next/image";
import { formatDateAndTime } from "@contentful/f36-datetime";
import { useRouter } from "next/router";
import Error from "../../../components/Error";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.query.event ?? "undefined";
  const eveTitle = String(name).replaceAll("-", " ");
  async function getEventName() {
    return await gqlclient.request(getSingleEvent, {
      eventTitle: eveTitle,
    });
  }
  await reactQueryClient.prefetchQuery({
    queryKey: ["event", eveTitle],
    queryFn: getEventName,
  });
  return {
    props: {
      qup: dehydrate(reactQueryClient),
    },
  };
};

export default function Event({ qup }: { qup: QueryProps }) {
  const router = useRouter();
  const eventDetails = getDataFromQueryKey(
    ["event", ((router.query?.event as string) ?? "").replaceAll("-", " ")],
    qup.queries
  ).items;
  if (eventDetails?.length === 0 || eventDetails === undefined) {
    return <Error />;
  }
  const event = eventDetails[0];

  const renderOptions = (links: any): Options => {
    const assetMap = links.assets.block;

    return {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: renderAsset(assetMap),
      },
    };
  };
  function getAsset(arr: any, id: any) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].sys.id == id) {
        return arr[i];
      }
    }
  }
  const renderAsset = (assetMap: Map<string, any>): NodeRenderer => {
    const temp = (node: any) => {
      const asset = getAsset(assetMap, node.data.target.sys.id);
      if (!asset) {
        return <></>;
      }
      const { url, description, width, height } = asset;
      let size = "medium";
      let desc = `Sketch Event | ${event.title} | ${event.smallDescription}`;
      try {
        const temp = JSON.parse(description);
        const sizeTemp = temp.size;
        const possibleSizes = [
          "x-small",
          "small",
          "medium",
          "large",
          "x-large",
        ];
        if (possibleSizes.includes(sizeTemp)) {
          size = sizeTemp;
        }
      } catch {}
      try {
        const temp = JSON.parse(description);
        let tempDesc = temp.description;
        if (tempDesc) desc = `Sketch Event | ${event.title} | ${tempDesc}`;
      } catch {}
      // data[0].description.links.assets;
      return (
        <Image
          src={url}
          alt={desc}
          width={width}
          height={height}
          data-size={size}
        />
      );
    };
    return temp;
  };
  return (
    <section id="event-page">
      <Head>
        <title>Sketch | {event.title}</title>
        <meta name="description" content={event.smallDescription}></meta>
      </Head>
      <div className="title-banner">
        <div className="title-info">
          <h1 data-text={event.title}>{event.title}</h1>
          <span>{formatDateAndTime(event.date, "day")}</span>
          <p>{event.smallDescription}</p>
          {event.registrationLink != null &&
            event.registrationLink != "" &&
            event.registrationLink != " " &&
            event.eventType.type.toLowerCase() == "upcoming" && (
              <a
                className="registrationLink button"
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Register Now
              </a>
            )}
        </div>
        <div className="title-img">
          <div className="img-container">
            <Image src={event.picture.url} alt="event pic" fill sizes="100vw" />
          </div>
        </div>
      </div>
      <div className="desc">
        {documentToReactComponents(
          event.description.json,
          renderOptions(event.description.links)
        )}
      </div>
    </section>
  );
}
