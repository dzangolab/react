import type { LazyTableState } from "./types";
export type TSortDirection = "ASC" | "DESC" | "";
type TSingleFilter = {
    key: string;
    operator: string;
    value: string;
};
type TMultiFilter = {
    AND: TSingleFilter[];
};
type TFilterRequest = TSingleFilter | TMultiFilter | null;
type TSingleSort = {
    key: string;
    direction: TSortDirection;
};
type TLimit = number | null;
type TOffset = number | null;
type TSortRequest = TSingleSort[] | null;
export interface IRequestJSON {
    filter: TFilterRequest;
    sort: TSortRequest;
    offset: TOffset;
    limit: TLimit;
}
type GetRequestJSONOptions = {
    customColumnsMap: {
        [key: string]: string;
    };
};
export declare const getFilterParameters: ({ filters }: LazyTableState, options?: GetRequestJSONOptions) => any;
export declare const getSortParameters: ({ sortField, sortOrder }: LazyTableState, options?: GetRequestJSONOptions) => {
    key: string;
    direction: "ASC" | "DESC";
}[] | null;
export declare const getPaginationParameters: ({ rows, first }: LazyTableState, options?: GetRequestJSONOptions) => {
    limit: number;
    offset: number;
};
export declare const getRequestJSON: (parameters: LazyTableState, options?: GetRequestJSONOptions) => IRequestJSON;
export {};
//# sourceMappingURL=utils.d.ts.map