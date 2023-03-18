import { QueryKey, QueryState } from "@tanstack/react-query";

export type versions = "v1" | "v2" | "v3";

export interface CommonDataType {
  clubName: string;
  mission: string;
  aboutIntro: string;
  design: string;
  develop: string;
  footerText: string;
  deliver: string;
  domains: string[];
  instagram: string;
  linkedIn: string;
  numOfAlumni: number;
  numOfMembers: number;
  email: string;
}

export interface AppContextState {
  version: versions | null;
  commonData: CommonDataType | null;
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
