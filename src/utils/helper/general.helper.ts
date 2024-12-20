import { MenuProps } from "antd";
import React, { ReactNode } from "react";
import { APP_CONSTANTS } from "../constants/app.constant";

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
  let url = dynamicUrl.concat("?");
  if (url) {
    for (const key in object) {
      if (object[key]) url = url?.concat(`${key}=`, `${object[key]}&`);
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
  if (param === "new") return trueSide;
  return falseSide;
};

export function getSqftDimensions(area: number, aspectRatio: number = 1) {
  // aspectRatio should be provided as a number, e.g., 2 for a 2:1 ratio (length:width)
  const width = Math.sqrt(area / aspectRatio);
  const length = aspectRatio * width;

  return {
    height: +length.toFixed(0) * 15, // Round to 2 decimal places for simplicity
    width: +width.toFixed(0) * 15,
  };
}

export const pixelToMeterConverter = (meter: number): number => {
  return meter * 25;
};

export const sentenceIdentifier = (
  index: number,
  identifier: string = "**"
): string => {
  return `${identifier}${index}${identifier}`;
};

export function replaceSelectedItem(
  sentence: string,
  value: { identifier: string; value: string }[]
): string {
  value.forEach((x) => {
    sentence = sentence.replace(x.identifier, x.value);
  });
  return sentence;
}

export function extractArrays(sentence: string): {
  finalArrays: { identifier: string; array: string[] }[];
  updatedSentence: string;
} {
  const matches = [...sentence.matchAll(APP_CONSTANTS.ARRAY_IDENTIFY_PATTERN)];
  return stringExtraction(matches, sentence, "**");
}

export function extractObject(sentence: string): {
  finalArrays: { identifier: string; array: string[] }[];
  updatedSentence: string;
} {
  const matches = [...sentence.matchAll(APP_CONSTANTS.OBJECT_IDENTIFY_PATTERN)];
  return stringExtraction(matches, sentence, "^^");
}

const stringExtraction = (
  matches: any[],
  sentence: string,
  identity: string
) => {
  let updatedSentence = sentence;

  const finalArrays = matches.map((match, index: number) => {
    let identifier = sentenceIdentifier(index, identity);
    let currentMatch = match[0];
    updatedSentence = updatedSentence.replace(currentMatch, identifier);
    let array = match[1]
      .split(",")
      .map((item: String) => item.trim().replace(/^['"]|['"]$/g, ""));
    return { identifier, array };
  });

  return { finalArrays, updatedSentence };
};

export const toggleStringInArray = (arr: string[] = [], str: string) => {
  const index = arr.indexOf(str);
  if (index > -1) {
    arr.splice(index, 1);
  } else {
    arr.push(str);
  }
  return arr;
};
