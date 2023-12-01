import { useTranslation } from "@dzangolab/react-i18n";
import { TDataTable } from "@dzangolab/react-ui";

const TanstackTable = () => {
  const { t } = useTranslation("ui");

  return (
    <TDataTable
      visibleColumns={["givenName", "middleNames", "surname", "address"]}
      columns={[
        {
          id: "fullName",
          header: () => <span>{t("table.headers.fullName")}</span>,
          columns: [
            {
              accessorKey: "givenName",
              header: () => <span>{t("table.headers.givenName")}</span>,
              tooltip: true,
              tooltipOptions: {
                position: "right",
              },
              filterPlaceholder: t("table.placeholders.givenName"),
              enableColumnFilter: true,
              enableSorting: true,
            },
            {
              accessorKey: "middleNames",
              header: () => <span>{t("table.headers.middleNames")}</span>,
            },
            {
              accessorKey: "surname",
              header: () => <span>{t("table.headers.surname")}</span>,
              enableColumnFilter: true,
              enableSorting: true,
            },
          ],
        },
        {
          accessorKey: "address",
          header: () => <span>{t("table.headers.address")}</span>,
          enableColumnFilter: true,
          enableSorting: true,
        },
      ]}
      data={((count: number) => {
        const data: any[] = [];
        for (let i = 0; i < count; i++) {
          data[i] = {
            id: i + 1,
            givenName: "jone" + i,
            middleNames: "abcd" + ((count - i) % (i + 1)),
            surname: "doe" + (count % (i + 1)),
            address: "address" + (count - i),
          };
        }
        return data;
      })(20)}
      isLoading={false}
      onRowSelectChange={() => {}}
      enableRowSelection={true}
      paginationOptions={{
        showPageButtons: false,
        pageInputLabel: t("table.pagination.pageControl"),
        itemsPerPageControlLabel: t("table.pagination.rowsPerPage"),
      }}
      emptyTableMessage={t("table.emptyTableMessage")}
      stripe="even"
      border="none"
      id="invitations-table"
      initialFilters={[{ id: "givenName", value: "0" }]}
      showColumnsAction={true}
      columnActionBtnLabel={t("table.actions.columnActionBtnLabel")}
    ></TDataTable>
  );
};

export default TanstackTable;
