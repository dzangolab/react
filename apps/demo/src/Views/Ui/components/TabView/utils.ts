export const addTab = (
  key: string,
  visibleTabs: any[],
  setVisibleTabs: any,
  setActive: any,
) => {
  const newTab = { key };
  const existingTab = visibleTabs.find((tab) => tab.key === key);
  if (existingTab) {
    setActive(Number(existingTab.key));
  } else {
    setVisibleTabs([...visibleTabs, newTab]);
    setActive(Number(newTab.key));
  }
};
