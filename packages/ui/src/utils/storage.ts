type StorageType = "localStorage" | "sessionStorage";

export const getStorage = (storageType: StorageType): Storage => {
  return storageType === "sessionStorage" ? sessionStorage : localStorage;
};
