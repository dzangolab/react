import { Fragment } from "react";
import { Link } from "react-router-dom";

import { LinkType } from "@/types/types";

interface ILinkProperties {
  className?: string;
  links: Array<LinkType>;
}

export const AuthLinks = ({ className, links }: ILinkProperties) => {
  let linksClassName = "auth-links";

  if (className) {
    linksClassName += " " + className;
  }

  return (
    <div className={linksClassName}>
      {links.map((link) => {
        return (
          <Fragment key={link.label}>
            {link.display ? (
              <Link to={link.to} className={link.className}>
                {link.label}
              </Link>
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
};
