import { QueryKey } from "@tanstack/react-query";
import { CustomQueryType } from "../types";

export function isArraysEqual(a: any[] | QueryKey, b: any[] | QueryKey) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function getDataFromQueryKey(key: QueryKey, allQueries: CustomQueryType[]) {
  for (let i = 0; i < allQueries.length; i++) {
    let query = allQueries[i];
    if (isArraysEqual(query.queryKey, key)) {
      try {
        return (query.state.data as any)[Object.keys(query.state.data as any)[0]];
      } catch {
        return {};
      }
    }
  }
  return new Error("Key not found in given queries.");
}

export function isStringInArray(str: string, arr: string[]) {
  for (let i of arr) {
    if (i === str) return true;
  }
  return false;
}
