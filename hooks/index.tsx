import { AppContext } from "../pages/_app";
import { useContext } from "react";
import type { CommonDataType } from "../types";
export function useCommonData(): CommonDataType {
  const [context] = useContext(AppContext);
  console.log("this is common data", context.commonData);
  return context.commonData as CommonDataType;
}
