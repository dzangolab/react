export const mergeObjects = (target: any, source: any): void => {
  for (const key in source) {
    if (typeof source[key] === "object" && !Array.isArray(source[key])) {
      // If the current property is an object, recursively merge it
      mergeObjects(target[key], source[key]);
    } else {
      // Otherwise, assign the value directly
      target[key] = source[key];
    }
  }
};
