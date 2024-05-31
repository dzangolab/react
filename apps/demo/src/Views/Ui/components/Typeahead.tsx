import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Typeahead } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../components/Demo";

const items: string[] = [
  "red",
  "blue",
  "yellow",
  "gray",
  "black",
  "purple",
  "pink",
  "blacker",
  "pinnacle",
  "gravers",
];

export const TypeaheadDemo = () => {
  const [t] = useTranslation("ui");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const [selectedServerValue, setSelectedServerValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleDataFetch = (value: any) => {
    setIsLoading(true);
    fetch(`https://api.escuelajs.co/api/v1/products/?title=${value}`)
      .then(async (response) => {
        const data = await response.json();
        setOptions(data.map((item: any) => item.title));
        setIsLoading(false);
      })
      .catch((err) => console.log("err", err));
  };

  const handleServerChange = (value: any) => {
    setSelectedServerValue(value);
  };

  const hanldeDataFilter = (value: any) => {
    let newSuggestions: any = [];

    if (value.length > 0) {
      newSuggestions = items.filter((_value) =>
        _value.toLowerCase().startsWith(value.toLowerCase()),
      );
      setSuggestions(newSuggestions);
    }
  };

  return (
    <Page title={t("typeahead.title")}>
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          label={t("typeahead.label.client")}
          data={[]}
          onSearch={hanldeDataFilter}
        />
      </Section>
      <Section>
        <Typeahead
          label={t("typeahead.label.server")}
          placeholder={t("typeahead.placeholder")}
          data={options}
          loading={isLoading}
          onSearch={handleDataFetch}
          onChange={handleServerChange}
          debounceTime={500}
        />
      </Section>
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          label={t("typeahead.label.invalid")}
          hasError={true}
          errorMessage="Required field"
        />
      </Section>
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          label={t("typeahead.label.disabled")}
          data={items}
          disabled={true}
        />
      </Section>
    </Page>
  );
};
