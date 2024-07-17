import { useTranslation } from "@dzangolab/react-i18n";
import { Outlet } from "react-router-dom";

import { ButtonDemo } from "./components/Button";
import { CardDemo } from "./components/CardDemo";
import { ConfirmationModalDemo } from "./components/ConfirmationModal";
import { DropdownMenuDemo } from "./components/DropdownMenuDemo";
import { EditableTitleDemo } from "./components/EditableTitleDemo";
import { ExportButtonDemo } from "./components/ExportButton";
import { FileCardDemo } from "./components/FileCard";
import { FilesListDemo } from "./components/FilesList";
import { FilesPresentationDemo } from "./components/FilesPresentation";
import { FilesTableDemo } from "./components/FilesTable";
import {
  CheckboxDemo,
  InputDemo,
  SelectDemo,
  SwitchInputDemo,
  TextareaDemo,
  TypeaheadDemo,
} from "./components/FormWidgets";
import { LoadingDemo } from "./components/Loading";
import { LocalDataTableDemo } from "./components/LocalDataTable";
import { MessageDemo } from "./components/Message";
import { ModalDemo } from "./components/ModalDemo";
import { PageDemo } from "./components/PageDemo";
import { PopupDemo } from "./components/Popup";
import { ResponsiveMenuDemo } from "./components/ResponsiveMenu";
import { SortableListDemo } from "./components/SortableList";
import { StepperDemo } from "./components/Stepper";
import { SubmitButtonDemo } from "./components/SubmitButton";
import { TabbedPanelDemo } from "./components/TabbedPanel";
import { TableDemo } from "./components/Table";
import { TagDemo } from "./components/Tag/Tag";
import { TooltipDemo } from "./components/Tooltip";
import { YoutubeFacadeDemo } from "./components/YoutubeFacade";
import { Demo } from "../../components/Demo";

export const UI_ROUTES = {
  GET_STARTED: "/ui",
  CARD: "/ui/card",
  CONFIRMATION_MODAL: "/ui/confirmation-modal",
  LOADING: "/ui/loading",
  BUTTON: "/ui/button",
  SUBMIT_BUTTON: "/ui/submit-button",
  FILES_TABLE: "/ui/files-table",
  DROPDOWN_MENU: "/ui/dropdown-menu",
  EDITABLE_TITLE: "/ui/editable-title",
  RESPONSIVE_MENU: "/ui/responsive-menu",
  YOUTUBE_FACADE: "/ui/youtube-facade",
  EXPORT_BUTTON: "/ui/export-xlsx",
  FILE_CARD: "/ui/file-card",
  FILES_LIST: "/ui/files-list",
  FILES_PRESENTATION: "/ui/files-presentation",
  TABLE: "/ui/table",
  LOCAL_DATA_TABLE: "/ui/local-table",
  MESSAGE: "/ui/message",
  MODAL: "/ui/modal",
  TOOLTIP: "/ui/tooltip",
  CHECKBOX: "/ui/checkbox",
  INPUT: "/ui/input",
  SELECT: "/ui/select",
  SWITCH_INPUT: "/ui/switch-input",
  SORTABLE_LIST: "/ui/sortable-list",
  POPUP: "/ui/popup",
  PAGE_DEMO: "/ui/page-demo",
  STEPPER: "/ui/stepper",
  TABBED_PANEL: "/ui/tabbed-pannel",
  TAG: "/ui/tag",
  TEXTAREA: "/ui/textarea",
  TYPEAHEAD: "/ui/typeahead",
};

const FORM_WIDGETS_ROUTES = [
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
    path: UI_ROUTES.SELECT,
    key: "select.title",
    element: <SelectDemo />,
  },
  {
    path: UI_ROUTES.SWITCH_INPUT,
    key: "switchInput.title",
    element: <SwitchInputDemo />,
  },
  {
    path: UI_ROUTES.TEXTAREA,
    key: "textarea.title",
    element: <TextareaDemo />,
  },
  {
    path: UI_ROUTES.TYPEAHEAD,
    key: "typeahead.title",
    element: <TypeaheadDemo />,
  },
];
const BUTTONS_ROUTES = [
  {
    path: UI_ROUTES.BUTTON,
    key: "button.title",
    element: <ButtonDemo />,
  },
  {
    path: UI_ROUTES.EXPORT_BUTTON,
    key: "exportButton.title",
    element: <ExportButtonDemo />,
  },
  {
    path: UI_ROUTES.SUBMIT_BUTTON,
    key: "submitButton.title",
    element: <SubmitButtonDemo />,
  },
];
const OTHERS = [
  {
    path: UI_ROUTES.CARD,
    key: "card.title",
    element: <CardDemo />,
  },
  {
    path: UI_ROUTES.CONFIRMATION_MODAL,
    key: "confirmationModal.title",
    element: <ConfirmationModalDemo />,
  },
  {
    path: UI_ROUTES.DROPDOWN_MENU,
    key: "dropdownMenu.title",
    element: <DropdownMenuDemo />,
  },
  {
    path: UI_ROUTES.EDITABLE_TITLE,
    key: "editableTitle.title",
    element: <EditableTitleDemo />,
  },
  {
    path: UI_ROUTES.FILES_TABLE,
    key: "filesTable.title",
    element: <FilesTableDemo />,
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
    path: UI_ROUTES.LOADING,
    key: "loading.title",
    element: <LoadingDemo />,
  },
  {
    path: UI_ROUTES.LOCAL_DATA_TABLE,
    key: "localDataTable.title",
    element: <LocalDataTableDemo />,
  },
  {
    path: UI_ROUTES.MESSAGE,
    key: "message.title",
    element: <MessageDemo />,
  },
  {
    path: UI_ROUTES.MODAL,
    key: "modal.title",
    element: <ModalDemo />,
  },
  {
    path: UI_ROUTES.PAGE_DEMO,
    key: "page.title.menu",
    element: <PageDemo />,
  },
  {
    path: UI_ROUTES.POPUP,
    key: "popup.title",
    element: <PopupDemo />,
  },
  {
    path: UI_ROUTES.RESPONSIVE_MENU,
    key: "responsiveMenu.title",
    element: <ResponsiveMenuDemo />,
  },
  {
    path: UI_ROUTES.SORTABLE_LIST,
    key: "sortableList.title",
    element: <SortableListDemo />,
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
    path: UI_ROUTES.TABLE,
    key: "table.title",
    element: <TableDemo />,
  },
  {
    path: UI_ROUTES.TAG,
    key: "tag.title",
    element: <TagDemo />,
  },
  {
    path: UI_ROUTES.TOOLTIP,
    key: "tooltip.title",
    element: <TooltipDemo />,
  },
  {
    path: UI_ROUTES.YOUTUBE_FACADE,
    key: "youtubeFacade.title",
    element: <YoutubeFacadeDemo />,
  },
];

export const routes = [...OTHERS, ...BUTTONS_ROUTES, ...FORM_WIDGETS_ROUTES];

export const Pages = () => {
  const [t] = useTranslation("ui");

  const subnav = [
    {
      navItems: [
        { route: "/ui", label: t("app:getStarted") },
        ...OTHERS.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
    {
      header: t("headers.buttons"),
      navItems: [
        ...BUTTONS_ROUTES.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
    {
      header: t("headers.formWidgets"),
      navItems: [
        ...FORM_WIDGETS_ROUTES.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
  ];

  return (
    <Demo subnav={subnav} isGrouped>
      <Outlet />
    </Demo>
  );
};
