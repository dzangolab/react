import React from "react";

const CodeBlock = ({
  title,
  exampleCode,
  subheader,
}: {
  title: string;
  exampleCode: string;
  subheader?: React.ReactNode;
}) => {
  return (
    <div className="code-block">
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

export default CodeBlock;
