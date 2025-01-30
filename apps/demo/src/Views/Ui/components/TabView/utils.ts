export const addTab = (
  key: string,
  visibleTabs: any[],
  setVisibleTabs: any,
  setActive: any,
) => {
  const newTab = { key };

  setVisibleTabs([...visibleTabs, newTab]);
  setActive(newTab.key);
};
