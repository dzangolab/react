import React, { useEffect, useMemo, useRef, useState } from "react";

import { getStorage } from "../utils";
import { getOrientation, onTabDown } from "./utils";

import type { Properties, Tab } from "./types";

const TabView: React.FC<Properties> = ({
  position = "top",
  tabs,
  visibleTabs: _visibleTabs,
  onTabClose,
  activeTab: _activeTab,
  id = "",
  persistState = true,
  persistStateStorage = "localStorage",
  onTabChange,
}) => {
  const tabReferences = useRef<(HTMLButtonElement | null)[]>([]);

  const storage = useMemo(
    () => getStorage(persistStateStorage),
    [persistStateStorage],
  );

  const [tabState, setTabState] = useState<{
    visibleTabs: { key: string }[];
    activeTab: string | undefined;
  }>(() => {
    if (id && persistState) {
      const savedTabStates = storage.getItem(id);

      if (savedTabStates) {
        const parsedTabs = JSON.parse(savedTabStates);

        return {
          visibleTabs: parsedTabs.visibleTabs || _visibleTabs,
          activeTab: parsedTabs.activeTab || _activeTab,
        };
      }
    }

    return {
      visibleTabs: _visibleTabs,
      activeTab: _activeTab,
    };
  });

  console.log("outsidetabstate", tabState);
  useEffect(() => {
    const visibleTabsLength = tabState.visibleTabs?.length;
    const _visibleTabsLength = _visibleTabs?.length;

    if (JSON.stringify(tabState.visibleTabs) === JSON.stringify(_visibleTabs)) {
      setTabState((previousState) => ({
        ...previousState,
        visibleTabs: tabState.visibleTabs,
      }));
    } else {
      if (visibleTabsLength && _visibleTabsLength) {
        if (visibleTabsLength > _visibleTabsLength) {
          setTabState((previousState) => ({
            ...previousState,
            visibleTabs: tabState.visibleTabs,
          }));
        } else {
          setTabState((previousState) => ({
            ...previousState,
            visibleTabs: _visibleTabs,
          }));
        }
      }
    }
  }, [_visibleTabs, tabState.visibleTabs]);

  useEffect(() => {
    setTabState((previousState) => ({
      ...previousState,
      activeTab: _activeTab,
    }));
  }, [_activeTab]);

  useEffect(() => {
    if (id && persistState) {
      storage.setItem(
        id,
        JSON.stringify({
          activeTab: tabState.activeTab,
          visibleTabs: tabState.visibleTabs,
        }),
      );
    }
  }, [tabState.visibleTabs, tabState.activeTab, id, persistState, storage]);

  if (!tabState.visibleTabs || !tabs) {
    throw new Error("Tabview needs at least one tab");
  }

  const filteredTabs = tabState.visibleTabs
    .map((visibleTab) => {
      return tabs.find((tab) => tab.key === visibleTab.key);
    })
    .filter((tab): tab is Tab => tab !== undefined);

  const handleTabClose = (key: string) => {
    const tabIndex = tabState.visibleTabs.findIndex((tab) => tab.key === key);
    const newVisibleTabs = tabState.visibleTabs.filter(
      (tab) => tab.key !== key,
    );

    let newActiveTab = "";
    if (tabIndex > 0) {
      newActiveTab = newVisibleTabs[tabIndex - 1]?.key;
    } else {
      newActiveTab = newVisibleTabs[0].key;
    }

    setTabState({ visibleTabs: newVisibleTabs, activeTab: newActiveTab });
    console.log("tabstate", tabState);
    if (onTabClose) {
      onTabClose(key);
    }
  };

  const handleFocus = (index: number) => {
    const tab = tabReferences.current[index];
    if (tab) {
      tab.focus();
    }
  };

  const handleTabChange = (key: string) => {
    setTabState((previous) => {
      return { ...previous, activeTab: key };
    });

    if (onTabChange) {
      onTabChange(key);
    }
  };

  return (
    <div className={`tabbed-panel ${position}`}>
      <div role="tablist" aria-orientation={getOrientation(position)}>
        {filteredTabs.map((item, index) => {
          const isActive = tabState.activeTab === item.key;
          const title = item.label;
          const icon = item.icon;
          const key = index;

          return (
            <button
              onKeyDown={(event) => {
                onTabDown(
                  index,
                  event,
                  filteredTabs.length,
                  handleFocus,
                  getOrientation(position),
                );
              }}
              onFocus={() =>
                setTabState((previous) => {
                  return { ...previous, activeTab: item.key };
                })
              }
              ref={(element) => (tabReferences.current[index] = element)}
              onClick={() => handleTabChange(item.key)}
              key={key}
              role="tab"
              aria-label={title}
              aria-disabled={isActive}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={isActive ? "active" : ""}
            >
              {icon ? (
                <img src={icon} alt="title icon" aria-hidden="true" />
              ) : null}
              <span>{title}</span>
              {item.closable ? (
                <i
                  onClick={(event) => {
                    event.stopPropagation();
                    handleTabClose(item.key);
                  }}
                  className="pi pi-times"
                ></i>
              ) : null}
            </button>
          );
        })}
      </div>
      <div role="tabpanel">
        {filteredTabs.find((tab) => tab.key === tabState.activeTab)?.children}
      </div>
    </div>
  );
};

export default TabView;
