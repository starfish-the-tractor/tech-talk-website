import React from "react";
import { Depths } from "@uifabric/fluent-theme";

export function Pre(props: React.Props<typeof Pre>) {
  return (
    <div
      style={{
        boxShadow: Depths.depth4,
        marginTop: 16,
        marginBottom: 16,
        width: "100%",
        overflowX: "auto"
      }}
    >
      <pre className="hljs" style={{ margin: 0 }}>
        {props.children}
      </pre>
    </div>
  );
}
