import { useTranslation } from "@dzangolab/react-i18n";
import { TDataTable } from "@dzangolab/react-ui";

const TanstackTable = () => {
  const { t } = useTranslation("ui");
  return (
    <TDataTable
      visibleColumns={["givenName", "middleNames", "surname", "address"]}
      columns={[
        {
          accessorKey: "givenName",
          header: () => <span>{t("table.headers.givenName")}</span>,
          tooltip: true,
          tooltipOptions: {
            position: "right",
          },
        },
        {
          accessorKey: "middleNames",
          header: () => <span>{t("table.headers.middleNames")}</span>,
        },
        {
          accessorKey: "surname",
          header: () => <span>{t("table.headers.surname")}</span>,
          enableSorting: false,
          enableHiding: false,
          enableColumnFilter: false,
          enableGlobalFilter: false,
        },
        {
          accessorKey: "address",
          header: () => <span>{t("table.headers.address")}</span>,
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
      stripe="even"
    ></TDataTable>
  );
};

export default TanstackTable;
