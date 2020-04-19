import React, { useEffect, useState } from "react";
import path from "path-browserify";
import { MotionTimings, MotionDurations } from "@uifabric/fluent-theme";
// import logo from "./logo.svg";
import "./App.css";
import { ContentItem, Article, DetailItem } from "./struct";
import { parseContent } from "./parsers";
import ContentList from "./component/contentList";
import NavList from "./component/navList";
import MarkdownDetail from "./component/markdownDetail";
import HtmlDetail from "./component/htmlDetail";
import SlideDetail from "./component/slideDetail";

function App() {
  let [content, setContent] = useState<ContentItem[]>([]);
  let [current, setCurrent] = useState<Article>();
  let [selected, setSelected] = useState<DetailItem>();
  useEffect(() => {
    (async () => {
      try {
        let res = await fetch(
          "https://raw.githubusercontent.com/starfish-the-tractor/tech-talk-per-month/master/Contents.md",
          {
            // cache: "no-cache",
            mode: "cors"
          }
        );
        if (!res.ok) {
          throw res.status;
        }
        let raw = await res.text();
        let result = await parseContent(raw);
        setContent(result);
      } catch (e) {}
    })();
  }, []);
  const fileType = path.extname(selected?.url ?? "");
  return (
    <div className="App ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
        <div
          className={
            "ms-Grid-col " + (current !== undefined ? "ms-sm3" : "ms-sm6")
          }
          style={{
            left: current !== undefined ? "0%" : "25%",
            transitionProperty: "left",
            transitionDuration: MotionDurations.duration4,
            textAlign: "left",
            height: "100vh",
            overflowY: "auto"
          }}
        >
          <ContentList
            item={content}
            width={current !== undefined ? "25vw" : "50vw"}
            selected={current}
            onChange={item => {
              setCurrent(item);
              setSelected(item.detail[0]);
            }}
          />
        </div>
        <div
          className="ms-Grid-col ms-sm6"
          style={{
            visibility: current !== undefined ? "visible" : "collapse",
            opacity: current !== undefined ? 1 : 0,
            transitionProperty: "opacity",
            transitionDelay: MotionDurations.duration4,
            transitionDuration: MotionDurations.duration4,
            transitionTimingFunction: MotionTimings.standard,
            height: current !== undefined ? "100vh" : 0,
            overflowY: "auto",
            padding: 0
          }}
        >
          {selected?.type === "main" && (
            <React.Fragment>
              {fileType === ".md" && <MarkdownDetail detail={selected} />}
              {fileType !== ".md" && <HtmlDetail detail={selected} />}
            </React.Fragment>
          )}
          {selected?.type === "slide" && <SlideDetail detail={selected} />}
        </div>
        <div
          className="ms-Grid-col ms-sm3"
          style={{
            visibility: current !== undefined ? "visible" : "collapse",
            opacity: current !== undefined ? 1 : 0,
            transitionProperty: "opacity",
            transitionDelay: MotionDurations.duration4,
            transitionDuration: MotionDurations.duration4,
            transitionTimingFunction: MotionTimings.standard,
            height: current !== undefined ? "100vh" : 0
          }}
        >
          <NavList
            data={current || { key: "", detail: [] }}
            selected={selected}
            onChange={setSelected}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
