import { useTranslation } from "@dzangolab/react-i18n";
import {
  TRequestJSON,
  Table,
  TableColumnDefinition,
} from "@dzangolab/react-ui";

import "@dzangolab/react-ui/dist/TableTheme.css";

interface IProperties {
  columns?: TableColumnDefinition<unknown, unknown>[];
  data: unknown[];
  fetchHandler: (requestJSON: TRequestJSON) => void;
  inputDebounceTime?: number;
  isLoading?: boolean;
  title?: string;
  totalItems: number;
}

const UsersTable: React.FC<IProperties> = ({
  columns,
  data,
  fetchHandler,
  inputDebounceTime = 1000,
  isLoading,
  title,
  totalItems,
}) => {
  const { t } = useTranslation("users");

  const defaultColumns: TableColumnDefinition<unknown, unknown>[] = [
    {
      accessorKey: "id",
      header: () => <span>{t("table.defaultColumn.id")}</span>,
    },
    {
      accessorKey: "givenName",
      header: () => <span>{t("table.defaultColumn.givenName")}</span>,
    },
    {
      accessorKey: "middleNames",
      header: () => <span>{t("table.defaultColumn.middleNames")}</span>,
    },
    {
      accessorKey: "surname",
      header: () => <span>{t("table.defaultColumn.surname")}</span>,
    },
  ];

  return (
    <Table
      columns={columns ? columns : defaultColumns}
      data={data}
      isLoading={isLoading}
      totalItems={totalItems}
      title={title}
      fetcher={fetchHandler}
      inputDebounceTime={inputDebounceTime}
    />
  );
};

export default UsersTable;
