import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Typeahead } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../components/Demo";

export const TypeaheadDemo = () => {
  const [t] = useTranslation("ui");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const items: any = ["red", "blue", "yellow", "blur", "black"];

  const handleDataFetch = (value: any) => {
    setIsLoading(true);
    fetch(
      `http://localhost:20070/things?filters={"key":"name","operator":"ct","value":"${value}"}`,
    )
      .then(async (response) => {
        const data = await response.json();
        setOptions(data.data.map((item: any) => item.name));
        setIsLoading(false);
      })

      .catch((err) => console.log("err", err));
  };

  return (
    <Page title={t("typeahead.title")}>
      <Section>
        <Typeahead
          placeholder="Search..."
          label="Basic Typeahead"
          data={items}
        />
      </Section>
      <Section>
        <Typeahead
          label="Typeahead with endpoints"
          placeholder="Search..."
          data={options}
          loading={isLoading}
          onChange={handleDataFetch}
        />
      </Section>
    </Page>
  );
};
