import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Typeahead } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../../components/Demo";

type CustomSuggestionType = {
  label: string;
  value: number;
};

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

const suggestionItems: Array<CustomSuggestionType> = [
  { label: "Rose", value: 10 },
  { label: "Tulip", value: 20 },
  { label: "Daisy", value: 30 },
  { label: "Sunflower", value: 40 },
  { label: "Lily", value: 50 },
  { label: "Orchid", value: 60 },
  { label: "Marigold", value: 70 },
  { label: "Lavender", value: 80 },
  { label: "Peony", value: 90 },
  { label: "Chrysanthemum", value: 100 },
  { label: "Daffodil", value: 110 },
  { label: "Hydrangea", value: 120 },
];

export const TypeaheadDemo = () => {
  const [t] = useTranslation("ui");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const [selectedServerValue, setSelectedServerValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [customSuggestions, setCustomSuggestions] = useState<
    Array<CustomSuggestionType>
  >([]);

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

  const handleDataFilter = (value: any) => {
    let newSuggestions: any = [];

    if (value.length > 0) {
      newSuggestions = items.filter((_value) =>
        _value.toLowerCase().startsWith(value.toLowerCase()),
      );
      setSuggestions(newSuggestions);
    }
  };

  const handleCustomSuggestionDataFilter = (value?: any) => {
    let newSuggestions: any = [];

    if (value && value.length) {
      newSuggestions = suggestionItems.filter((_value) =>
        _value.label.toLowerCase().includes(value.toLowerCase()),
      );
      setCustomSuggestions(newSuggestions);
    }
  };

  const renderSuggestion = (suggestion: any) => {
    return (
      <>
        <div>{suggestion.label}</div>
        <div>{suggestion.value}</div>
      </>
    );
  };

  return (
    <Page title={t("typeahead.title")}>
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          label={t("typeahead.label.client")}
          data={suggestions}
          onSearch={handleDataFilter}
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
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          label={t("typeahead.label.customSuggestion")}
          data={customSuggestions}
          onSearch={handleCustomSuggestionDataFilter}
          renderSuggestion={renderSuggestion}
        />
      </Section>
    </Page>
  );
};
