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
