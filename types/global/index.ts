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
  youtube: string;
  discord: string;
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
 
export interface EventType {
  title: string;
  description: Description;
  smallDescription: string;
  date: Date;
  picture: Picture;
}

export interface Description {
  json: CustomJSON;
}

export interface CustomJSON {
  data: Data;
  content: JSONContent[];
  nodeType: string;
}

export interface JSONContent {
  data: Data;
  content: ContentContent[];
  nodeType: string;
}

export interface ContentContent {
  data: Data;
  marks: any[];
  value: string;
  nodeType: string;
}

export interface Data {}

export interface Picture {
  url: string;
}
