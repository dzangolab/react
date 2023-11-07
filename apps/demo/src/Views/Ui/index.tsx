import {
  LoadingIcon,
  Page,
  ResponsiveMenu,
  FilesTable,
  FileCard,
  FilesList,
  FilesPresentation,
  TDataTable,
} from "@dzangolab/react-ui";

import { ExportButton } from "./ExportButton";
import FacadeExample from "./Facades/Example";
import { LocalDataTable } from "./LocalDataTable/LocalDataTable";
import { SubmitButton } from "./SubmitButton";
import ComponentList from "../../components/ComponentList";
import { MENU_ROUTES } from "../../constants";

const componentList = [
  {
    key: 1,
    title: "loading",
    component: (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <LoadingIcon color={"black"} fontSize={"0.5rem"} />
      </div>
    ),
  },
  {
    key: 2,
    title: "buttons.submit",
    component: <SubmitButton />,
  },
  {
    key: 3,
    title: "responsiveMenu",
    component: (
      <>
        <Page title="Horizontal menu">
          <ResponsiveMenu routes={MENU_ROUTES} />
        </Page>
        <Page title="Vertical menu">
          <ResponsiveMenu routes={MENU_ROUTES} orientation="vertical" />
        </Page>
      </>
    ),
  },
  {
    key: 4,
    title: "facades.youtubeFacade",
    component: <FacadeExample />,
  },
  {
    key: 5,
    title: "buttons.export",
    component: <ExportButton />,
  },
  {
    key: 6,
    title: "table.title.localDataTable",
    component: <LocalDataTable />,
  },
  {
    key: 7,
    title: "files.table",
    component: (
      <FilesTable
        onFileDelete={() => {}}
        onFileArchive={() => {}}
        files={[
          {
            id: 0,
            originalFileName: "my file",
            description: "File 1 description",
            uploadedBy: { givenName: "Manish", lastName: "Aryal" },
            uploadedAt: Date.now(),
            lastDownloadedAt: Date.now(),
          },
          {
            id: 1,
            originalFileName: "my filev2",
            description: "File description",
            uploadedBy: { givenName: "Nabin", lastName: "Dhital" },
            uploadedAt: Date.now(),
            lastDownloadedAt: Date.now(),
          },
        ]}
        visibleColumns={[
          "originalFileName",
          "description",
          "uploadedBy",
          "uploadedAt",
          "downloadCount",
          "lastDownloadedAt",
          "actions",
        ]}
        columns={[
          {
            field: "uploadedBy",
            bodyTooltip: (data) => {
              return `${data.uploadedBy.givenName} ${data.uploadedBy.lastName}`;
            },
          },
          {
            field: "description",
            bodyTooltipOptions: {
              style: {
                maxWidth: "20rem",
              },
            },
          },
          {
            field: "uploadedAt",
            bodyTooltip: true,
          },
        ]}
      />
    ),
  },
  {
    key: 8,
    title: "file.card",
    component: (
      <FileCard
        file={{
          id: 0,
          originalFileName: "file1.png",
          description: "This is my file",
          size: 4,
          uploadedBy: { givenName: "Manish", lastName: "Aryal" },
          uploadedAt: Date.now(),
          downloadCount: 0,
          lastDownloadedAt: Date.now(),
        }}
        onDownload={() => {}}
        onView={() => {}}
        onShare={() => {}}
        onArchive={() => {}}
        onDelete={() => {}}
      />
    ),
  },
  {
    key: 9,
    title: "files.list",
    component: (
      <FilesList
        files={[
          {
            id: 0,
            originalFileName: "file1.png",
            uploadedBy: { givenName: "Manish", lastName: "Aryal" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            lastDownloadedAt: Date.now(),
          },
          {
            id: 1,
            originalFileName: "document.pdf",
            uploadedBy: { givenName: "Gaurav", lastName: "Sapkota" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            lastDownloadedAt: Date.now(),
          },
          {
            id: 2,
            originalFileName: "photo.jpeg",
            uploadedBy: { givenName: "Deepak", lastName: "Aryal" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            lastDownloadedAt: Date.now(),
          },
          {
            id: 3,
            originalFileName: "manish.png",
            uploadedBy: { givenName: "Lamdiki", lastName: "Sherpa" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            lastDownloadedAt: Date.now(),
          },
        ]}
        onFileDownload={() => {}}
        onFileView={() => {}}
      />
    ),
  },
  {
    key: 10,
    title: "files.presentation",
    component: (
      <FilesPresentation
        visibleFileDetails={[
          "originalFileName",
          "description",
          "size",
          "uploadedBy",
          "uploadedAt",
          "downloadCount",
          "lastDownloadedAt",
          "actions",
        ]}
        presentation="table"
        onEditDescription={() => {}}
        onFileDownload={() => {}}
        onFileView={() => {}}
        files={[
          {
            id: 0,
            originalFileName: "file1.png",
            uploadedBy: { givenName: "Manish", lastName: "Aryal" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            description: "file1 description",
            size: 1000,
            lastDownloadedAt: Date.now(),
          },
          {
            id: 1,
            originalFileName: "document.pdf",
            uploadedBy: { givenName: "Gaurav", lastName: "Sapkota" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            lastDownloadedAt: Date.now(),
          },
          {
            id: 2,
            originalFileName: "photo.jpeg",
            uploadedBy: { givenName: "Deepak", lastName: "Aryal" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            lastDownloadedAt: Date.now(),
          },
          {
            id: 3,
            originalFileName: "manish.png",
            uploadedBy: { givenName: "Lamdiki", lastName: "Sherpa" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            lastDownloadedAt: Date.now(),
          },
        ]}
      />
    ),
  },
  {
    key: 11,
    title: "table.title.baseTable",
    component: (
      <TDataTable
        visibleColumns={[
          "id",
          "givenName",
          "middleNames",
          "surname",
          "address",
        ]}
        // fetchData={(data: any) => {
        //   console.log(data);
        // }}
        columns={[
          {
            accessorKey: "id",
            header: () => <span>ID</span>,
            enableSorting: false,
            enableColumnFilter: false,
            align: "center",
          },
          {
            accessorKey: "givenName",
            header: () => <span>Given Name</span>,
          },
          {
            accessorKey: "middleNames",
            header: () => <span>Middle Names</span>,
          },
          {
            accessorKey: "surname",
            header: () => <span>Surname</span>,
            align: "left",
          },
          {
            accessorKey: "address",
            align: "right",
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
        // totalItems={5}
        renderToolbarItems={() => {
          return <div>toolbar</div>;
        }}
        onRowSelect={(table: any) => {
          console.log(table.getFilteredSelectedRowModel());
        }}
      ></TDataTable>
    ),
  },
];

const Ui = () => {
  return (
    <ComponentList
      componentList={componentList}
      title={"header.menu.ui"}
      translationNameSpace={["ui"]}
    />
  );
};

export default Ui;
