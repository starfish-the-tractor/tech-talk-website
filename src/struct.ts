import React from "react";

export interface DetailItem {
  type: string;
  text: string;
  url: string;
}

export type Article = {
  key: string;
  detail: DetailItem[];
};

export type ContentItem = Article[] & { name?: string };

export interface DetailProps<T> extends React.Props<T> {
  detail?: DetailItem;
}
