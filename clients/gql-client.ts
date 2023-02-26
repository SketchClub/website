import { GraphQLClient } from "graphql-request";

const gqlclient = new GraphQLClient(String(process.env.GQL_ENDPOINT), {
  headers: { authorization: `Bearer ${process.env.GQL_TOKEN}` }
});
export default gqlclient;
