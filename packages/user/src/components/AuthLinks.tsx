import { Link } from "react-router-dom";

import { LinkType } from "@/types/types";

interface ILinkProperties {
  className?: string;
  links: Array<LinkType>;
}

export const AuthLinks = ({ className, links }: ILinkProperties) => {
  let linksClassName = "links";

  if (className) {
    linksClassName += " " + className;
  }

  return (
    <div className={linksClassName}>
      {links.map((link) => {
        return (
          <>
            {link.display ? (
              <Link to={link.to} className={link.className} key={link.label}>
                {link.label}
              </Link>
            ) : null}
          </>
        );
      })}
    </div>
  );
};
