import { useMemo } from "react";

export const useVisibleOrFilterField = <T extends string>(
  visibleFields: T[],
) => {
  return useMemo(() => {
    const visibleDetails = {} as Record<T, boolean>;

    for (const name of visibleFields) {
      visibleDetails[name] = true;
    }

    return visibleDetails;
  }, [visibleFields]);
};
