import { QueryKey, QueryState } from "@tanstack/react-query";

export type versions = "v1" | "v2" | "v3";

export interface AppContextState {
  version: versions | null;
  commonData: any;
}

export interface CustomQueryType {
  queryHash: string;
  queryKey: QueryKey;
  state: QueryState;
}

export interface QueryProps {
  mutations: any[];
  queries: CustomQueryType[];
}
