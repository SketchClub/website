import { gql } from "graphql-request";

export const getCommonWebContent = gql`
  query {
    webContentCollection(limit: 1) {
      items {
        clubName
        mission
        aboutIntro
        design
        develop
        deliver
        footerText
      }
    }
  }
`;

export const getMembers = gql`
  query ($memType: String!) {
    memberCollection(where: { memberType: { title_contains: $memType } }) {
      items {
        name
        profilePicture {
          url
        }
        domain {
          title
        }
        mail
        insta
        tag
      }
    }
  }
`;

export const getEvent = gql`
  query ($eventType: String!, $wantDesc: Boolean!) {
    eventCollection(where: { eventType: { type_contains: $eventType } }) {
      items {
        title
        description @include(if: $wantDesc) {
          json
        }
        smallDescription
        date
        picture {
          url
        }
      }
    }
  }
`;

export const getSingleEvent = gql`
  query ($eventTitle: String!) {
    eventCollection(where: { title_contains: $eventTitle }, limit: 1) {
      items {
        title
        date
        picture {
          url
        }
        description {
          json
          links {
            assets {
              block {
                url
                description
                width
                height
                sys {
                  id
                }
              }
            }
          }
        }
        registrationLink
        eventType {
          type
        }
        smallDescription
      }
    }
  }
`;
