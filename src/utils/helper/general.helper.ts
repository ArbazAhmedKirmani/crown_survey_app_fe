import { MenuProps } from "antd";
import React, { ReactNode } from "react";

export type MenuItem = Required<MenuProps>["items"][number];

export const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};

export function createDynamicUrl(
  dynamicUrl: string,
  object: Record<string, unknown>
) {
  let url = dynamicUrl;
  if (url) {
    for (const key in object) {
      if (object[key]) url = url?.replace(`{${key}}`, `${object[key]}`);
    }
  }

  return url;
}

export const checkEditablePage = (
  param: string | undefined,
  trueSide: string | ReactNode,
  falseSide: string | ReactNode
) => {
  if (!param) return falseSide;
  if (param === "new") return falseSide;
  return trueSide;
};
