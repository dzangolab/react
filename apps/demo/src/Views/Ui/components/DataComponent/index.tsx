import { Data, GridContainer } from "@dzangolab/react-ui";

export const DataDemo = () => {
  const testData = [
    // Test case 1: Simple label/value
    {
      label: "Name",
      value: "John Doe",
    },

    // Test case 2: Simple label/value with a number
    {
      label: "Age",
      value: 30,
    },

    // Test case 3: Label/value with email
    {
      label: "Email",
      value: { email: "john.doe@example.com", user: "John Doe" },
      dataKey: "email",
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
  ];

  return (
    <GridContainer>
      {testData.map((data, index) => (
        <Data key={index} {...data} />
      ))}
    </GridContainer>
  );
};
