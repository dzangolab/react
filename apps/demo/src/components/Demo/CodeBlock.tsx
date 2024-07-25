import React, { useEffect, useRef } from "react";

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
  const reference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && reference.current) {
      reference.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [autoFocus, reference, exampleCode]);

  const renderHeader = () => {
    if (!title && !subheader) return null;

    return (
      <header>
        {title ? <h3>{title}</h3> : null}
        {subheader}
      </header>
    );
  };

  return (
    <div ref={reference} className="code-block" autoFocus={autoFocus}>
      {renderHeader()}

      <pre>
        <code>{exampleCode}</code>
      </pre>
    </div>
  );
};
