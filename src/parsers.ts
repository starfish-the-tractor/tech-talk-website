// import React from "react";
import unified from "unified";
import { Node } from "unist";
import markdown from "remark-parse";
import { Article } from "./struct";

interface TraverseOption {
  visitor?: { [x: string]: (node: Node, context: any) => any };
  context?: any;
}

export function traverse(option: TraverseOption) {
  let { visitor, context } = Object.assign(
    { visitor: {}, context: {} },
    option
  );
  function transformer(tree: Node) {
    function iter(node: Node, context: any) {
      let childrenContext = Object.assign(
        Object.assign({}, context),
        typeof visitor[node.type] === "function"
          ? visitor[node.type](node, context)
          : {}
      );
      if (node.children instanceof Array) {
        for (let c of node.children) {
          iter(c, childrenContext);
        }
      }
    }
    iter(tree, context);
  }
  return transformer;
}

const contentParser = unified()
  .use(markdown)
  .use(traverse, {
    visitor: {
      root: function(node, context) {
        node.children = (node.children as Node[]).filter(
          n => n.type !== "heading" || n.depth === 2
        );
        return {};
      }
    }
  });

type MdNode = Node & { children: MdNode[] };

export async function parseContent(raw: string) {
  let node = (await contentParser.run(contentParser.parse(raw))) as MdNode;
  let filtered = node.children
    .map(node => {
      if (node.type === "heading") {
        return {
          type: "heading",
          value: node.children[0].value as string
        };
      } else if (node.type === "list") {
        return {
          type: "list",
          value: node.children.map(node => {
            let detail = node.children[0].children
              .filter(node => node.type === "link")
              .map(node => {
                let text = node.children[0].value as string;
                let type = "main";
                let m = /^\[(.+)\]$/g.exec(text);
                if (m !== null) {
                  type = m[1];
                  text = m[1];
                }
                return {
                  type: type,
                  text: text,
                  url: node.url as string
                };
              });
            return {
              key: detail.find(value => value.type === "main")!.text,
              detail: detail
            };
          })
        };
      }
    })
    .filter(it => it !== undefined);
  let result = [];
  for (let it of filtered) {
    if (it!.type === "heading") {
      let content = [] as Article[] & { name?: string };
      content.name = it!.value as string;
      result.push(content);
    } else {
      result[result.length - 1].push(...(it!.value as Article[]));
    }
  }
  return result;
}
