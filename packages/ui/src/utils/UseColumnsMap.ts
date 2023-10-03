import { useMemo } from "react";

export const useColumnsMap = <T extends string>(fields: T[]) => {
  return useMemo(() => {
    const visibleFields = {} as Record<T, boolean>;

    for (const name of fields) {
      visibleFields[name] = true;
    }

    return visibleFields;
  }, [fields]);
};
