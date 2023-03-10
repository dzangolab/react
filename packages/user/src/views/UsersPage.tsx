import {
  Page,
  TRequestJSON,
  Table,
  TableColumnDefinition,
} from "@dzangolab/react-ui";

import "@dzangolab/react-ui/dist/TableTheme.css";

interface IProperties {
  customColumns?: TableColumnDefinition<unknown, unknown>[];
  data: unknown[];
  fetchHandler: (requestJSON: TRequestJSON) => void;
  isLoading?: boolean;
  subtitle?: string;
  tableTitle?: string;
  title?: string;
  totalItems: number;
}

const UsersPage: React.FC<IProperties> = ({
  customColumns,
  data,
  fetchHandler,
  isLoading,
  subtitle,
  tableTitle,
  title,
  totalItems,
}) => {
  const columns: TableColumnDefinition<unknown, unknown>[] = [
    {
      accessorKey: "id",
      header: () => <span>ID</span>,
    },
    {
      accessorKey: "givenName",
      header: () => <span>givenName</span>,
    },
    {
      accessorKey: "middleNames",
      header: () => <span>middleNames</span>,
    },
    {
      accessorKey: "surname",
      header: () => <span>surname</span>,
    },
  ];

  return (
    <Page title={title} subtitle={subtitle} loading={isLoading}>
      <Table
        columns={customColumns ? customColumns : columns}
        data={data}
        isLoading={isLoading}
        totalItems={totalItems}
        title={tableTitle}
        fetcher={fetchHandler}
        inputDebounceTime={1000}
      />
    </Page>
  );
};

export default UsersPage;
