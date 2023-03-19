import { AppContext } from "../pages/_app";
import { useContext } from "react";
import type { CommonDataType } from "../types";
export function useCommonData(): CommonDataType {
  const [context] = useContext(AppContext);
  return context.commonData as CommonDataType;
}
