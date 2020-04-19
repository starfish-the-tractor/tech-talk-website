import React, { useState } from "react";
import { DetailProps } from "../struct";

function HtmlDetail(props: DetailProps<typeof HtmlDetail>) {
  let url = props.detail
    ? new URL(
        props.detail.url,
        "https://starfish-the-tractor.github.io/tech-talk-per-month/"
      ).toString()
    : "";
  return (
    <React.Fragment>
      <div
        style={{
          zIndex: -1,
          position: "absolute",
          textAlign: "center",
          width: "100%",
          paddingTop: 16
        }}
      >
        无法正常嵌入网页，请自行打开
      </div>
      <iframe
        frameBorder="0"
        style={{
          background: "transparent",
          zIndex: 1,
          border: 0,
          width: "100%",
          height: "calc(100vh - 4px)",
          margin: 0
        }}
        src={url}
      />
    </React.Fragment>
  );
}

export default HtmlDetail;
