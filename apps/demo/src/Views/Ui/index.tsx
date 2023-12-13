import {
  LoadingIcon,
  Page,
  ResponsiveMenu,
  FileCard,
  FilesList,
  FilesPresentation,
  SortableList,
} from "@dzangolab/react-ui";
import { Button } from "@dzangolab/react-ui";

import CheckboxDemo from "./CheckboxDemo";
import { ExportButton } from "./ExportButton";
import FacadeExample from "./Facades/Example";
import FilesTableDemo from "./FilesTableDemo";
import { LocalDataTable } from "./LocalDataTable/LocalDataTable";
import TanstackTable from "./LocalDataTable/TanstackTable";
import MessageDemo from "./MessageDemo";
import PopupDemo from "./PopupDemo";
import StepperDemo from "./StepperDemo";
import { SubmitButton } from "./SubmitButton";
import { TooltipDemo } from "./TooltipDemo";
import ComponentList from "../../components/ComponentList";
import { MENU_ROUTES } from "../../constants";
import { ButtonDemo } from "./ButtonDemo";

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
    component: <FilesTableDemo />,
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
    title: "table.title.tanstackTable",
    component: <TanstackTable></TanstackTable>,
  },
  {
    key: 12,
    title: "message.title",
    component: <MessageDemo />,
  },
  {
    key: 13,
    title: "tooltip.title",
    component: <TooltipDemo />,
  },
  {
    key: 14,
    title: "checkbox.title",
    component: <CheckboxDemo />,
  },
  {
    key: 15,
    title: "sortableList.title",
    component: (
      <SortableList
        items={[
          { id: 1, data: "Item 1" },
          { id: 2, data: "Item 2" },
          { id: 3, data: "Item 3" },
        ]}
      />
    ),
  },
  {
    key: 16,
    title: "popup.title",
    component: <PopupDemo />,
  },
  {
    key: 17,
    title: "stepper.title",
    component: <StepperDemo />,
  },
  {
    key: 18,
    title: "button.title",
    component: <ButtonDemo />,
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
