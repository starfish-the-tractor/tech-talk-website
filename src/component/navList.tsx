import React from "react";
import { ChoiceGroup, IChoiceGroupOption, Icon } from "@fluentui/react";
import { Article, DetailItem } from "../struct";

interface NavListProps extends React.Props<typeof NavList> {
  data: Article;
  selected?: DetailItem;
  onChange: (option?: DetailItem) => void;
}

type MyOption = {
  detail: DetailItem;
} & IChoiceGroupOption;

function getIcon(type?: string) {
  switch (type) {
    case "main":
      return "TextDocument";
    case "slide":
      return "Presentation";
    default:
      return undefined;
  }
}

function NavList(props: NavListProps) {
  let options = props.data.detail.map(
    (val, index) =>
      ({
        key: val.url,
        text: val.text,
        detail: val,
        onRenderField: (props, render) => (
          <div style={{ display: "flex" }}>
            <Icon
              styles={{ root: { fontSize: 20, marginRight: 8 } }}
              iconName={getIcon((props as MyOption)?.detail.type)}
            />
            {render!(props)}
          </div>
        )
      } as MyOption)
  );
  if (options.length > 0) {
    options[0].checked = true;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%"
      }}
    >
      {props.data !== undefined && (
        <ChoiceGroup
          defaultValue={props.data.detail[0]?.url}
          options={options}
          value={props.selected?.url}
          onChange={(_, option) => {
            props.onChange((option as MyOption).detail);
          }}
        />
      )}
    </div>
  );
}

export default NavList;
