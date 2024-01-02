import { useTranslation } from "@dzangolab/react-i18n";
import { Outlet } from "react-router-dom";

import { ButtonDemo } from "./components/Button";
import { CheckboxDemo } from "./components/Checkbox";
import { ExportButtonDemo } from "./components/ExportButton";
import { FileCardDemo } from "./components/FileCard";
import { FilesListDemo } from "./components/FilesList";
import { FilesPresentationDemo } from "./components/FilesPresentation";
import { FilesTableDemo } from "./components/FilesTable";
import { InputDemo } from "./components/Input";
import { LoadingDemo } from "./components/Loading";
import { LocalDataTableDemo } from "./components/LocalDataTable";
import { MessageDemo } from "./components/Message";
import { PopupDemo } from "./components/Popup";
import { ResponsiveMenuDemo } from "./components/ResponsiveMenu";
import { SortableListDemo } from "./components/SortableList";
import { StepperDemo } from "./components/Stepper";
import { SubmitButtonDemo } from "./components/SubmitButton";
import { TabbedPanelDemo } from "./components/TabbedPanel";
import { TableDemo } from "./components/Table";
import { TooltipDemo } from "./components/Tooltip";
import { YoutubeFacadeDemo } from "./components/YoutubeFacade";
import { Demo } from "../../components/Demo";
import { PageDemo } from "./components/PageDemo";

export const UI_ROUTES = {
  GET_STARTED: "/ui",
  LOADING: "/ui/loading",
  BUTTON: "/ui/button",
  SUBMIT_BUTTON: "/ui/submit-button",
  FILES_TABLE: "/ui/files-table",
  RESPONSIVE_MENU: "/ui/responsive-menu",
  YOUTUBE_FACADE: "/ui/youtube-facade",
  EXPORT_BUTTON: "/ui/export-xlsx",
  FILE_CARD: "/ui/file-card",
  FILES_LIST: "/ui/files-list",
  FILES_PRESENTATION: "/ui/files-presentation",
  TABLE: "/ui/table",
  LOCAL_DATA_TABLE: "/ui/local-table",
  MESSAGE: "/ui/message",
  TOOLTIP: "/ui/tooltip",
  CHECKBOX: "/ui/checkbox",
  INPUT: "/ui/input",
  SORTABLE_LIST: "/ui/sortable-list",
  POPUP: "/ui/popup",
  PAGEDEMO: "/ui/page-demo",
  STEPPER: "/ui/stepper",
  TABBED_PANEL: "/ui/tabbed-pannel",
};

export const routes = [
  {
    path: UI_ROUTES.LOADING,
    key: "loading.title",
    element: <LoadingDemo />,
  },
  {
    path: UI_ROUTES.BUTTON,
    key: "button.title",
    element: <ButtonDemo />,
  },
  {
    path: UI_ROUTES.SUBMIT_BUTTON,
    key: "submitButton.title",
    element: <SubmitButtonDemo />,
  },
  {
    path: UI_ROUTES.FILES_TABLE,
    key: "filesTable.title",
    element: <FilesTableDemo />,
  },
  {
    path: UI_ROUTES.RESPONSIVE_MENU,
    key: "responsiveMenu.title",
    element: <ResponsiveMenuDemo />,
  },
  {
    path: UI_ROUTES.YOUTUBE_FACADE,
    key: "youtubeFacade.title",
    element: <YoutubeFacadeDemo />,
  },
  {
    path: UI_ROUTES.EXPORT_BUTTON,
    key: "exportButton.title",
    element: <ExportButtonDemo />,
  },
  {
    path: UI_ROUTES.FILE_CARD,
    key: "fileCard.title",
    element: <FileCardDemo />,
  },
  {
    path: UI_ROUTES.FILES_LIST,
    key: "filesList.title",
    element: <FilesListDemo />,
  },
  {
    path: UI_ROUTES.FILES_PRESENTATION,
    key: "filesPresentation.title",
    element: <FilesPresentationDemo />,
  },
  {
    path: UI_ROUTES.LOCAL_DATA_TABLE,
    key: "localDataTable.title",
    element: <LocalDataTableDemo />,
  },
  {
    path: UI_ROUTES.TABLE,
    key: "table.title",
    element: <TableDemo />,
  },
  {
    path: UI_ROUTES.MESSAGE,
    key: "message.title",
    element: <MessageDemo />,
  },
  {
    path: UI_ROUTES.TOOLTIP,
    key: "tooltip.title",
    element: <TooltipDemo />,
  },
  {
    path: UI_ROUTES.CHECKBOX,
    key: "checkbox.title",
    element: <CheckboxDemo />,
  },
  {
    path: UI_ROUTES.INPUT,
    key: "input.title",
    element: <InputDemo />,
  },
  {
    path: UI_ROUTES.SORTABLE_LIST,
    key: "sortableList.title",
    element: <SortableListDemo />,
  },
  {
    path: UI_ROUTES.POPUP,
    key: "popup.title",
    element: <PopupDemo />,
  },
  {
    path: UI_ROUTES.STEPPER,
    key: "stepper.title",
    element: <StepperDemo />,
  },
  {
    path: UI_ROUTES.TABBED_PANEL,
    key: "tabbedPanel.title",
    element: <TabbedPanelDemo />,
  },
  {
    path: UI_ROUTES.PAGEDEMO,
    key: "page.title.menu",
    element: <PageDemo />,
  },
];

export const Pages = () => {
  const [t] = useTranslation("ui");

  const subnav = [
    { route: "/ui", label: t("app:getStarted") },
    ...routes.map(({ path, key }) => {
      return { route: path, label: t(key) };
    }),
  ];

  return (
    <Demo subnav={subnav}>
      <Outlet />
    </Demo>
  );
};
