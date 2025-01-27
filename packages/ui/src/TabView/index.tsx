import React, { useEffect, useMemo, useRef, useState } from "react";

import { getOrientation, onTabDown } from "./utils";
import { getStorage } from "../utils";

import type { Properties } from "./types";

const TabView: React.FC<Properties> = ({
  activeTabIndex = null,
  defaultActiveIndex = 1,
  position = "top",
  tabs,
  visibleTabs: _visibleTabs,
  onClose,
  id = "",
  persistState = true,
  onTabChange,
  persistStateStorage = "localStorage",
}) => {
  const [visibleTabs, setVisibleTabs] = useState(_visibleTabs);
  const tabReferences = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);

  const activeTabStorageKey = useMemo(() => `tab-${id}-active-index`, [id]);

  const storage = useMemo(
    () => getStorage(persistStateStorage),
    [persistStateStorage],
  );

  useEffect(() => {
    setVisibleTabs(_visibleTabs);
  }, [_visibleTabs]);

  useEffect(() => {
    const getActiveTab = () => {
      if (activeTabIndex !== null) {
        return activeTabIndex;
      }

      if (id && persistState) {
        const storedActiveTab = storage.getItem(activeTabStorageKey);
        return storedActiveTab !== null
          ? Number(storedActiveTab)
          : defaultActiveIndex;
      }

      return defaultActiveIndex;
    };

    setActive(getActiveTab());
  }, [activeTabIndex, defaultActiveIndex, id, storage, persistState]);

  useEffect(() => {
    if (id && persistState) {
      storage.setItem(activeTabStorageKey, String(active));
    }
  }, [active, id, persistState]);

  const handleFocus = (index: number) => {
    const tab = tabReferences.current[index];
    if (tab) {
      tab.focus();
    }
  };

  if (!visibleTabs) {
    throw new Error("Tabview needs at least one tab");
  }

  const filteredTabs = tabs?.filter((tab) =>
    visibleTabs?.some((visibleTab) => visibleTab.key === tab.key),
  );

  if (!filteredTabs || active === null) {
    return null;
  }

  const handleTabClose = (key: string) => {
    const tabIndex = visibleTabs.findIndex((tab) => tab.key === key);
    const newVisibleTabs = visibleTabs.filter((tab) => tab.key !== key);
    setVisibleTabs(newVisibleTabs);

    if (active === Number(key)) {
      if (newVisibleTabs.length > 0) {
        const newActive =
          tabIndex > 0
            ? newVisibleTabs[tabIndex - 1].key
            : newVisibleTabs[0].key;
        setActive(Number(newActive));
      }
    }

    if (onClose) {
      onClose(key);
    }
  };

  const handleTabChange = (key: string) => {
    setActive(Number(key));

    if (onTabChange) {
      onTabChange(key);
    }
  };

  return (
    <div className={`tabbed-panel ${position}`}>
      <div role="tablist" aria-orientation={getOrientation(position)}>
        {filteredTabs.map((item, index) => {
          const isActive = active === Number(item.key);
          const title = item.label;
          const icon = item.icon;
          const key = index;

          return (
            <button
              onKeyDown={(event) => {
                onTabDown(
                  active,
                  event,
                  filteredTabs.length,
                  handleFocus,
                  getOrientation(position),
                );
              }}
              onFocus={() => setActive(Number(item.key))}
              ref={(element) =>
                (tabReferences.current[Number(item.key)] = element)
              }
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
                <span
                  className="close-tab-icon"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleTabClose(item.key);
                  }}
                >
                  <i className="pi pi-times"></i>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <div role="tabpanel">
        {filteredTabs.find((tab) => Number(tab.key) === active)?.children}
      </div>
    </div>
  );
};

export default TabView;
