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
import { QueryProps } from "../../../types";
import { getDataFromQueryKey } from "../../../utils/common-functions";
import Image from "next/image";
import { formatDateAndTime } from "@contentful/f36-datetime";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.query.event ?? "undefined";
  async function getEventName() {
    return await gqlclient.request(getSingleEvent, {
      eventTitle: String(name).replaceAll("-", " "),
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
};

export default function Event({ qup }: { qup: QueryProps }) {
  const router = useRouter();
  const eventDetails = getDataFromQueryKey(
    ["event", router.query?.event ?? ""],
    qup.queries
  ).items;
  if (eventDetails.length === 0 || eventDetails === undefined) {
    return <>Gandi aadat hai bhai</>;
  }
  const event = eventDetails[0];
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
      return (
        <Image
          src={asset.url}
          width={asset.width}
          height={asset.height}
          alt={asset.description}
          quality={75}
        />
      );
    };
    return temp;
  };
  return (
    <div id="event">
      <h1 className="black-text-outline">{event.title}</h1>
      <div className="imgContainer">
        <Image src={event.picture.url} alt="event pic" fill />
      </div>
      <p className="date black-text-outline">
        {formatDateAndTime(event.date, "day")}
      </p>
      <div className="event-content">
        <>
          {documentToReactComponents(
            event.description.json,
            renderOptions(event.description.links)
          )}
        </>
      </div>

      {/* <div className="title-banner">
        <div className="title-info">
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
        </div>
      </div> */}
    </div>
  );
}
