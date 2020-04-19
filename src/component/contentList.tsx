import React from "react";
import {
  GroupedList,
  IGroup,
  DetailsRow,
  Selection,
  SelectionZone,
  Text,
  CheckboxVisibility
} from "@fluentui/react";
import { ContentItem, Article } from "../struct";

interface ContentListProps extends React.Props<typeof ContentList> {
  item: ContentItem[];
  width: string;
  selected?: Article;
  onChange: (item: Article) => void;
}

function ContentList(props: ContentListProps) {
  let items = [];
  let groups: IGroup[] = [];
  for (let date of props.item) {
    groups.push({
      count: date.length,
      key: date.name!,
      name: date.name!,
      startIndex: items.length
    });
    for (let it of date) {
      items.push(it);
    }
  }
  let selection = new Selection(); // only trick bug
  return (
    <SelectionZone selection={selection}>
      <GroupedList
        items={items}
        groups={groups}
        groupProps={{ headerProps: { styles: { check: { display: "none" } } } }}
        onRenderCell={(depth, item: Article, index) => (
          <div
            onClick={() => {
              props.onChange(item);
            }}
          >
            <DetailsRow
              checkboxVisibility={CheckboxVisibility.hidden}
              item={item}
              itemIndex={index!}
              groupNestingDepth={depth}
              selection={selection}
              useFastIcons={false}
              styles={{
                root:
                  item === props.selected
                    ? { background: "rgba(0,0,0,0.1)" }
                    : {}
              }}
              columns={[
                {
                  key: "name",
                  name: "name",
                  minWidth: 100,
                  onRender: (item: Article) => (
                    <div
                      key={item.key}
                      style={{
                        width: `calc(${props.width} - 88px)`,
                        userSelect: "none"
                      }}
                    >
                      <Text block nowrap>
                        {item.key}
                      </Text>
                    </div>
                  )
                }
              ]}
            />
          </div>
        )}
      />
    </SelectionZone>
  );
}

export default ContentList;
