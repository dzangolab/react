export const addTab = (
  key: string,
  visibleTabs: any[],
  setVisibleTabs: any,
  setActive: any,
) => {
  const existingTab = visibleTabs.find((tab) => tab === key);
  if (existingTab) {
    setActive(existingTab);

    window.location.hash = existingTab;
  } else {
    setVisibleTabs([...visibleTabs, key]);
    setActive(key);

    window.location.hash = key;
  }
};
