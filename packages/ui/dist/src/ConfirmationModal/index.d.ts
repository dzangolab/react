import { ConfirmDialogProps } from "primereact/confirmdialog";
import { IButtonProperties } from "..";
export interface IModalProperties extends ConfirmDialogProps {
    acceptButtonOptions?: IButtonProperties;
    cancelButtonOptions?: IButtonProperties;
    onHide?: () => void;
}
export declare const ConfirmationModal: ({ accept, acceptButtonOptions, reject, cancelButtonOptions, message, header, visible, onHide, footer, ...confirmOptions }: IModalProperties) => import("react").JSX.Element;
//# sourceMappingURL=index.d.ts.map