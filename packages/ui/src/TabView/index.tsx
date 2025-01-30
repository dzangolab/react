import React, { useEffect, useMemo, useRef, useState } from "react";

import { getStorage } from "../utils";
import { getOrientation, onTabDown } from "./utils";

import type { Properties, Tab } from "./types";

const TabView: React.FC<Properties> = ({
  defaultActiveIndex,
  position = "top",
  tabs,
  visibleTabs: _visibleTabs,
  onTabClose,
  id = "",
  persistState = true,
  persistStateStorage = "localStorage",
}) => {
  const tabReferences = useRef<(HTMLButtonElement | null)[]>([]);

  const storage = useMemo(
    () => getStorage(persistStateStorage),
    [persistStateStorage],
  );

  const [mounted, setMounted] = useState(false);
  const [tabState, setTabState] = useState<{
    visibleTabs: { key: string }[];
    activeTab: string | undefined;
  }>({ visibleTabs: _visibleTabs, activeTab: defaultActiveIndex });

  useEffect(() => {
    setMounted(true);
    if (persistState && id) {
      const storedState = storage.getItem(id);
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        setTabState({
          visibleTabs: parsedState.visibleTabs || _visibleTabs,
          activeTab: parsedState.activeTab || defaultActiveIndex,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      const tabs = _visibleTabs?.filter(
        (tab) =>
          !tabState.visibleTabs?.some(
            (visibleTab) => visibleTab.key === tab.key,
          ),
      );
      if (tabs.length === 0) {
        return;
      }

      setTabState({
        activeTab: tabs[0].key,
        visibleTabs: [...tabState.visibleTabs, ...tabs],
      });
    }
  }, [_visibleTabs]);

  useEffect(() => {
    if (mounted) {
      setTabState((previousTab) => ({
        ...previousTab,
        activeTab: defaultActiveIndex,
      }));
    }
  }, [defaultActiveIndex]);

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

    setTabState({
      activeTab: newActiveTab,
      visibleTabs: newVisibleTabs,
    });

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

  return (
    mounted && (
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
                onClick={() =>
                  setTabState((previous) => {
                    return { ...previous, activeTab: item.key };
                  })
                }
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
    )
  );
};

export default TabView;
