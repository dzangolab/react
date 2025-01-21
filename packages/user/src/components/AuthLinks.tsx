import { InlineLink } from "@dzangolab/react-ui";

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
        return link.display ? (
          <InlineLink key={link.label} label={link.label} to={link.to} />
        ) : null;
      })}
    </div>
  );
};
