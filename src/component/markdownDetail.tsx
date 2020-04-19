import React, { useState, useEffect, lazy } from "react";
import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import highlight from "rehype-highlight";
import rehype2react from "rehype-react";
import { DetailProps } from "../struct";
import { traverse } from "../parsers";
import { Link, Text } from "@fluentui/react";
import { Pre } from "./markdownComponent/code";

const render = unified()
  .use(markdown)
  .use(traverse, {})
  .use(remark2rehype)
  .use(highlight)
  .use(rehype2react, {
    createElement: React.createElement,
    components: { a: Link, p: Text, pre: Pre }
  });

function MarkdownDetail(props: DetailProps<typeof MarkdownDetail>) {
  let [data, setData] = useState("");
  useEffect(() => {
    setTimeout(async () => {
      if (props.detail == undefined) return;
      try {
        let url = new URL(
          props.detail.url,
          "https://raw.githubusercontent.com/starfish-the-tractor/tech-talk-per-month/master/"
        ).toString();
        let res = await fetch(url.toString(), {
          // cache: "no-cache",
          mode: "cors"
        });
        if (!res.ok) {
          throw res.status;
        }
        let raw = await res.text();
        setData(raw);
      } catch (e) {}
    }, 1000);
  }, [props.detail]);
  return (
    <div style={{ textAlign: "left", paddingBottom: 16 }}>
      {(render.processSync(data) as any).result}
    </div>
  );
}

export default MarkdownDetail;
