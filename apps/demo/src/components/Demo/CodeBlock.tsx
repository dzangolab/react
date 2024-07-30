import { useTranslation } from "@dzangolab/react-i18n";
import { Button } from "@dzangolab/react-ui";
import React, { useEffect, useRef, useState } from "react";

const COPY_STATES = {
  copy: { icon: "pi pi-copy", title: "codeBlock.copyStates.copy" },
  copied: { icon: "pi pi-check", title: "codeBlock.copyStates.copied" },
  error: {
    icon: "pi pi-exclamation-triangle",
    title: "codeBlock.copyStates.error",
  },
};

export const CodeBlock = ({
  autoFocus = false,
  title,
  exampleCode,
  subheader,
}: {
  autoFocus?: boolean;
  title?: string;
  exampleCode: string;
  subheader?: React.ReactNode;
}) => {
  const [copyState, setCopyState] = useState(COPY_STATES.copy);
  const reference = useRef<HTMLDivElement>(null);

  const [t] = useTranslation("app");

  useEffect(() => {
    if (autoFocus && reference.current) {
      reference.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [autoFocus, reference, exampleCode]);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(exampleCode)
      .then(() => {
        setCopyState(COPY_STATES.copied);
      })
      .catch((err) => {
        setCopyState(COPY_STATES.error);

        console.error("Could not copy text: ", err);
      });
  };

  const renderHeader = () => {
    if (!title && !subheader) return null;

    return (
      <header>
        {title ? <h3>{title}</h3> : null}
        {subheader ? subheader : null}
      </header>
    );
  };

  return (
    <div ref={reference} className="code-block" autoFocus={autoFocus}>
      {renderHeader()}

      <pre>
        <code>{exampleCode}</code>
      </pre>

      <div className="actions">
        <Button
          className="copy"
          iconLeft={copyState.icon}
          variant="outlined"
          title={t(copyState.title)}
          onClick={handleCopyClick}
        ></Button>
      </div>
    </div>
  );
};
