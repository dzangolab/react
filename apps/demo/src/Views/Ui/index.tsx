import {
  LoadingIcon,
  Page,
  ResponsiveMenu,
  FilesTable,
  FileCard,
  FilesList,
  FilesPresentation,
} from "@dzangolab/react-ui";

import { ExportButton } from "./ExportButton";
import FacadeExample from "./Facades/Example";
import { LocalDataTable } from "./LocalDataTable/LocalDataTable";
import { SubmitButton } from "./SubmitButton";
import ComponentList from "../../components/ComponentList";
import { MENU_ROUTES } from "../../constants";

import type { IFile } from "@dzangolab/react-ui";

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
        files={[
          {
            filename: "myfile",
            uploadedBy: { givenName: "Manish", lastName: "Aryal" },
            uploadedAt: Date.now(),
            lastDownloadedAt: Date.now(),
          },
        ]}
        visibleColumns={[
          "filename",
          "description",
          "uploadedBy",
          "uploadedAt",
          "downloadCount",
          "lastDownloadedAt",
          "actions",
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
          filename: "file1.png",
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
            filename: "file1.png",
            uploadedBy: { givenName: "Manish", lastName: "Aryal" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            lastDownloadedAt: Date.now(),
          },
          {
            filename: "document.pdf",
            uploadedBy: { givenName: "Gaurav", lastName: "Sapkota" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            lastDownloadedAt: Date.now(),
          },
          {
            filename: "photo.jpeg",
            uploadedBy: { givenName: "Deepak", lastName: "Aryal" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            lastDownloadedAt: Date.now(),
          },
          {
            filename: "manish.png",
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
    key: 9,
    title: "files.presentation",
    component: (
      <FilesPresentation
        visibleFileDetails={[
          "actions",
          "description",
          "downloadCount",
          "filename",
          "uploadedAt",
          "uploadedBy",
          "lastDownloadedAt",
          "filesize",
        ]}
        presentation="table"
        onEditDescription={(file: any) => {
          console.log(file);
        }}
        onFileDownload={(file: IFile) => {
          console.log(file);
        }}
        onFileView={(file: IFile) => {
          console.log(file);
        }}
        files={[
          {
            filename: "file1.png",
            uploadedBy: { givenName: "Manish", lastName: "Aryal" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            description: "file1 description",
            size: 1000,
            lastDownloadedAt: Date.now(),
          },
          {
            filename: "document.pdf",
            uploadedBy: { givenName: "Gaurav", lastName: "Sapkota" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            lastDownloadedAt: Date.now(),
          },
          {
            filename: "photo.jpeg",
            uploadedBy: { givenName: "Deepak", lastName: "Aryal" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            lastDownloadedAt: Date.now(),
          },
          {
            filename: "manish.png",
            uploadedBy: { givenName: "Lamdiki", lastName: "Sherpa" },
            uploadedAt: Date.now(),
            downloadCount: 5,
            lastDownloadedAt: Date.now(),
          },
        ]}
      />
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
