import { Data } from "@dzangolab/react-ui";

import "./index.css";

export const DataDemo = () => {
  const testData = [
    // Test case 1: Simple label/value
    {
      label: "Name",
      value: "John Doe",
    },

    // Test case 2: Simple label/value with a number
    {
      label: "age",
      value: 30,
    },

    // Test case 3: Label/value with email
    {
      label: "Email",
      value: "john.doe@example.com",
    },

    // Test case 4: Label/value with address
    {
      label: "Address",
      value: "123 Main St, Springfield, USA",
    },

    // Test case 5: Label/value for status
    {
      label: "Status",
      value: "Active",
    },

    // Test case 6: Label/value for inactive status
    {
      label: "Status",
      value: "Inactive",
    },
  ];

  return (
    <div className="data-container">
      {testData.map((data, index) => (
        <Data key={index} {...data} />
      ))}
    </div>
  );
};
