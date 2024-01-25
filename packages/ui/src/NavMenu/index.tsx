import { NavMenuItem } from "./Item";

interface INavMenuProperties {
  className?: string;
  routes: Array<{
    name: string;
    route: string;
    icon?: React.ReactNode;
  }>;
  orientation?: "horizontal" | "vertical";
  displayIcon?: false;
}
export const NavMenu = ({
  className,
  routes,
  orientation = "horizontal",
  displayIcon = false,
}: INavMenuProperties) => {
  let _className = "dz-nav-menu";

  if (className) {
    _className += " " + className;
  }
  return (
    <nav className={_className} aria-orientation={orientation}>
      <ul>
        {routes.map((route) => (
          <>
            <NavMenuItem route={route} displayIcon={displayIcon} />
          </>
        ))}
      </ul>
    </nav>
  );
};
