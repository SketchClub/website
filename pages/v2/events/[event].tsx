import { dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import gqlclient from "../../../clients/gql-client";
import reactQueryClient from "../../../clients/react-query-client";
import { getSingleEvent } from "../../../gql/queries";
import { QueryProps } from "../../../types/global";
import { getDataFromQueryKey } from "../../../utils/common-functions";
import {
  documentToReactComponents,
  NodeRenderer,
  Options,
} from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { formatDateAndTime } from "@contentful/f36-datetime";
import { BLOCKS } from "@contentful/rich-text-types";
import Head from "next/head";
import Error from "../../../components/Error";

export default function Event({ qup }: { qup: QueryProps }) {
  const router = useRouter();
  const eventDetailsTemp = getDataFromQueryKey(
    ["event", ((router.query?.event as string) ?? "").replaceAll("-", " ")],
    qup.queries
  )?.items;
  if (eventDetailsTemp?.length === 0 || eventDetailsTemp === undefined) {
    return <Error statusCode={"event-not-found"} />;
  }
  const event = eventDetailsTemp[0];
  const opt: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { url, description, height, width } = node.data.target.fields;
        // data[0].description.links.assets;
        return (
          <Image src={url} alt={description} height={height} width={width} />
        );
      },
    },
  };
  const renderOptions = (links: any): Options => {
    const assetMap = links.assets.block;

    return {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: renderAsset(assetMap),
      },
    };
  };
  function getAsset(arr: any, id: any) {
    var asset = {};
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
    <div id="event-container">
      <Head>
        <title>Sketch | {event.title}</title>
        <meta
          name="description"
          content={" Sketch | " + event.smallDescription}
        />
      </Head>
      <div className="head-container">
        <div className="title-container">
          <h2>{event.title}</h2>
        </div>
        <div className="img-container">
          <Image src={event.picture.url} alt="event" fill sizes="100%" />
        </div>
        <div className="date-container">
          <span>{formatDateAndTime(event.date, `day`)}</span>
        </div>
      </div>
      <div className="body-container">
        <div className="description">
          {documentToReactComponents(
            event.description.json,
            renderOptions(event.description.links)
          )}
        </div>
        {event.registrationLink != null &&
          event.registrationLink != "" &&
          event.registrationLink != " " && (
            <a
              className="regis-button"
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </a>
          )}
      </div>
    </div>
  );
}

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
