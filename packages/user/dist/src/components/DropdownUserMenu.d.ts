/// <reference types="react" />
import { DropdownMenuProperties } from "@dzangolab/react-ui";
import { UserMenuItemType } from "../types";
interface Properties extends Partial<Omit<DropdownMenuProperties, "dropdownMenu">> {
    onLogout?: () => void;
    showUserMenuIcon?: boolean;
    userMenu?: UserMenuItemType[];
}
declare const DropdownUserMenu: React.FC<Properties>;
export default DropdownUserMenu;
//# sourceMappingURL=DropdownUserMenu.d.ts.map