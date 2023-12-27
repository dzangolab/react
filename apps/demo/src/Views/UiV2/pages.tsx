import { useTranslation } from "@dzangolab/react-i18n";

import { ButtonDemo } from "./components/Button";
import { CheckboxDemo } from "./components/Checkbox";
import { ExportButtonDemo } from "./components/ExportButton";
import { FileCardDemo } from "./components/FileCard";
import { FilesListDemo } from "./components/FilesList";
import { FilesPresentationDemo } from "./components/FilesPresentation";
import FilesTableDemo from "./components/FilesTable";
import { InputDemo } from "./components/Input";
import { LoadingDemo } from "./components/Loading";
import { MessageDemo } from "./components/Message";
import { PopupDemo } from "./components/Popup";
import { ResponsiveMenuDemo } from "./components/ResponsiveMenu";
import { SortableListDemo } from "./components/SortableList";
import { SubmitButtonDemo } from "./components/SubmitButton";
import { YoutubeFacadeDemo } from "./components/YoutubeFacade";
import { TanstackTableDemo } from "./components/TanstackTable";
import { TooltipDemo } from "./components/Tooltip";
import { TabbedPanelDemo } from "./components/TabbedPanel";
import { StepperDemo } from "./components/Stepper";
import { Demo } from "../../components/Demo";

export const UI_ROUTES = {
  GET_STARTED: "/ui-v2",
  LOADING: "/ui-v2/loading",
  BUTTON: "/ui-v2/button",
  SUBMIT_BUTTON: "/ui-v2/submit-button",
  FILES_TABLE: "/ui-v2/files-table",
  RESPONSIVE_MENU: "/ui-v2/responsive-menu",
  YOUTUBE_FACADE: "/ui-v2/youtube-facade",
  EXPORT_BUTTON: "/ui-v2/export-xlsx",
  FILE_CARD: "/ui-v2/file-card",
  FILES_LIST: "/ui-v2/files-list",
  FILES_PRESENTATION: "/ui-v2/files-presentation",
  TANSTACK_TABLE: "/ui-v2/tanstack-table",
  MESSAGE: "/ui-v2/message",
  TOOLTIP: "/ui-v2/tooltip",
  CHECKBOX: "/ui-v2/checkbox",
  INPUT: "/ui-v2/input",
  SORTABLE_LIST: "/ui-v2/sortable-list",
  POPUP: "/ui-v2/popup",
  STEPPER: "/ui-v2/stepper",
  TABBED_PANEL: "/ui-v2/tabbed-pannel",
};

export const UIRoutes = [
  {
    path: UI_ROUTES.LOADING,
    key: "v2.loading.title",
    element: <LoadingDemo />,
  },
  {
    path: UI_ROUTES.BUTTON,
    key: "v2.button.title",
    element: <ButtonDemo />,
  },
  {
    path: UI_ROUTES.SUBMIT_BUTTON,
    key: "v2.submitButton.title",
    element: <SubmitButtonDemo />,
  },
  {
    path: UI_ROUTES.FILES_TABLE,
    key: "v2.filesTable.title",
    element: <FilesTableDemo />,
  },
  {
    path: UI_ROUTES.RESPONSIVE_MENU,
    key: "v2.responsiveMenu.title",
    element: <ResponsiveMenuDemo />,
  },
  {
    path: UI_ROUTES.YOUTUBE_FACADE,
    key: "v2.youtubeFacade.title",
    element: <YoutubeFacadeDemo />,
  },
  {
    path: UI_ROUTES.EXPORT_BUTTON,
    key: "v2.exportButton.title",
    element: <ExportButtonDemo />,
  },
  {
    path: UI_ROUTES.FILE_CARD,
    key: "v2.fileCard.title",
    element: <FileCardDemo />,
  },
  {
    path: UI_ROUTES.FILES_LIST,
    key: "v2.filesList.title",
    element: <FilesListDemo />,
  },
  {
    path: UI_ROUTES.FILES_PRESENTATION,
    key: "v2.filesPresentation.title",
    element: <FilesPresentationDemo />,
  },
  {
    path: UI_ROUTES.TANSTACK_TABLE,
    key: "v2.tanstackTable.title",
    element: <TanstackTableDemo />,
  },
  {
    path: UI_ROUTES.MESSAGE,
    key: "v2.message.title",
    element: <MessageDemo />,
  },
  {
    path: UI_ROUTES.TOOLTIP,
    key: "v2.tooltip.title",
    element: <TooltipDemo />,
  },
  {
    path: UI_ROUTES.CHECKBOX,
    key: "v2.checkbox.title",
    element: <CheckboxDemo />,
  },
  {
    path: UI_ROUTES.INPUT,
    key: "v2.input.title",
    element: <InputDemo />,
  },
  {
    path: UI_ROUTES.SORTABLE_LIST,
    key: "v2.sortableList.title",
    element: <SortableListDemo />,
  },
  {
    path: UI_ROUTES.POPUP,
    key: "v2.popup.title",
    element: <PopupDemo />,
  },
  {
    path: UI_ROUTES.STEPPER,
    key: "v2.stepper.title",
    element: <StepperDemo />,
  },
  {
    path: UI_ROUTES.TABBED_PANEL,
    key: "v2.tabbedPanel.title",
    element: <TabbedPanelDemo />,
  },
];

export const UIPages = () => {
  const [t] = useTranslation("ui");

  const sidebarMenu = [
    { route: "/ui-v2", label: t("v2.getStarted") },
    ...UIRoutes.map(({ path, key }) => {
      return { route: path, label: t(key) };
    }),
  ];

  return <Demo sidebarMenu={sidebarMenu}></Demo>;
};
