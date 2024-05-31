import React from "react";

const CssExample = ({
  exampleCode,
  subheader,
}: {
  exampleCode: string;
  subheader: React.ReactNode;
}) => {
  return (
    <div className="css-code-block">
      <header>
        <h3>CSS Code Example</h3>
        {subheader}
      </header>

      <pre>
        <code>{exampleCode}</code>
      </pre>
    </div>
  );
};

export default CssExample;
