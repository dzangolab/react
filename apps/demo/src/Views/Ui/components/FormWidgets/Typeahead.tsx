import { useTranslation } from "@dzangolab/react-i18n";
import { Page, Typeahead } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../../components/Demo";

type CustomSuggestionType = {
  name: string;
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
  { name: "Rose", value: 10 },
  { name: "Tulip", value: 20 },
  { name: "Daisy", value: 30 },
  { name: "Sunflower", value: 40 },
  { name: "Lily", value: 50 },
  { name: "Orchid", value: 60 },
  { name: "Marigold", value: 70 },
  { name: "Lavender", value: 80 },
  { name: "Peony", value: 90 },
  { name: "Chrysanthemum", value: 100 },
  { name: "Daffodil", value: 110 },
  { name: "Hydrangea", value: 120 },
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
  const [selectedCustomSuggestion, setSelectedCustomSuggestion] = useState("");

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

  const handleCustomSuggestionDataFilter = (value?: any) => {
    let newSuggestions: any = [];

    if (value && value.length) {
      newSuggestions = suggestionItems.filter((_value) =>
        _value.name.toLowerCase().includes(value.toLowerCase()),
      );
      setCustomSuggestions(newSuggestions);
    }
  };

  const renderSuggestion = (suggestion: any) => {
    return (
      <>
        <div>{suggestion.name}</div>
        <div>{suggestion.value}</div>
      </>
    );
  };

  const handleInputChange = (suggestion: any) => {
    setSelectedCustomSuggestion(suggestion.name);
  };

  return (
    <Page title={t("typeahead.title")}>
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          label={t("typeahead.label.client")}
          data={suggestions}
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
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          label={t("typeahead.label.customSuggestion")}
          value={selectedCustomSuggestion}
          data={customSuggestions}
          onSearch={handleCustomSuggestionDataFilter}
          renderSuggestion={renderSuggestion}
          onChange={handleInputChange}
        />
      </Section>
    </Page>
  );
};
