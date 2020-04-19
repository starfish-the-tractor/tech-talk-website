import React from "react";
import { DetailProps } from "../struct";

function SlideDetail(props: DetailProps<typeof SlideDetail>) {
  let url = props.detail
    ? new URL(
        props.detail.url,
        "https://starfish-the-tractor.github.io//tech-talk-per-month/"
      ).toString()
    : "";
  return (
    <iframe
      frameBorder="0"
      allowFullScreen
      style={{
        position: "fixed",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "gray",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        transform: "scale(0.5,0.5)"
      }}
      src={url}
    ></iframe>
  );
}

export default SlideDetail;
