import React, { useEffect, useRef } from "react";

export const CodeBlock = ({
  autoFocus = false,
  title,
  exampleCode,
  subheader,
}: {
  autoFocus?: boolean;
  title: string;
  exampleCode: string;
  subheader?: React.ReactNode;
}) => {
  const reference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && reference.current) {
      reference.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [autoFocus, reference, exampleCode]);

  return (
    <div ref={reference} className="code-block" autoFocus={autoFocus}>
      <header>
        <h3>{title}</h3>
        {subheader}
      </header>

      <pre>
        <code>{exampleCode}</code>
      </pre>
    </div>
  );
};
