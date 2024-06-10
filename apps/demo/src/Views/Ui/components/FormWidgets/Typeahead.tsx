import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Typeahead } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../../components/Demo";

type CustomSuggestionType = {
  value: string;
  label: number;
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
  { value: "Roslabel", label: 10 },
  { value: "Tulip", label: 20 },
  { value: "Daisy", label: 30 },
  { value: "Sunflower", label: 40 },
  { value: "Lily", label: 50 },
  { value: "Orchid", label: 60 },
  { value: "Marigold", label: 70 },
  { value: "Lavender", label: 80 },
  { value: "Peony", label: 90 },
  { value: "Chrysanthemum", label: 100 },
  { value: "Daffodil", label: 110 },
  { value: "Hydrangea", label: 120 },
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
        _value.value.toLowerCase().includes(value.toLowerCase()),
      );
      setCustomSuggestions(newSuggestions);
    }
  };

  const renderSuggestion = (suggestion: any) => {
    return (
      <>
        <div>{suggestion.value}</div>
        <div>{suggestion.label}</div>
      </>
    );
  };

  return (
    <Page title={t("typeahead.title")}>
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          value={t("typeahead.value.client")}
          data={suggestions}
          onSearch={handleDataFilter}
        />
      </Section>
      <Section>
        <Typeahead
          value={t("typeahead.value.server")}
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
          value={t("typeahead.value.invalid")}
          hasError={true}
          errorMessage="Required field"
        />
      </Section>
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          value={t("typeahead.value.disabled")}
          data={items}
          disabled={true}
        />
      </Section>
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          value={t("typeahead.value.customSuggestion")}
          data={customSuggestions}
          onSearch={handleCustomSuggestionDataFilter}
          renderSuggestion={renderSuggestion}
        />
      </Section>
    </Page>
  );
};
