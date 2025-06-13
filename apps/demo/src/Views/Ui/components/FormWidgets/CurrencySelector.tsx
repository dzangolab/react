import { Trans, useTranslation } from "@dzangolab/react-i18n";
import { CurrencySelector, Page, Button } from "@dzangolab/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../../components/Demo";

export const CurrencySelectorDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const [singleSelectCurrencyValue, setSingleSelectCurrencyValue] =
    useState<string>("");
  const [multiSelectCurrencyValue, setMultiSelectCurrencyValue] = useState<
    string[]
  >([]);
  const [
    searchableSingleSelectCurrencyValue,
    setSearchableSingleSelectCurrencyValue,
  ] = useState<string>("");

  const currencyOptions = [
    {
      code: "AUD",
      label: "Australian Dollar",
      symbol: "$",
      value: "AUD",
    },
    { code: "USD", label: "US Dollar", symbol: "$", value: "USD" },
    { code: "GBP", label: "British Pound", symbol: "£", value: "GBP" },
    { code: "EUR", label: "Euro", symbol: "€", value: "EUR" },
    { code: "JPY", label: "Japanese Yen", symbol: "¥", value: "JPY" },
  ];

  return (
    <Page
      title={t("currencySelector.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "CurrencySelector" })}</p>
        <CodeBlock exampleCode='import { CurrencySelector } from "@dzangolab/react-ui"' />
      </Section>

      <Section title={t("currencySelector.usage.basic")}>
        <CurrencySelector
          label={t("currencySelector.label")}
          name="currencySelector"
          currencyOptions={currencyOptions}
          value={singleSelectCurrencyValue}
          onChange={(value: string) => setSingleSelectCurrencyValue(value)}
          placeholder={t("currencySelector.placeholder")}
        />
        <CodeBlock
          exampleCode='
const [singleSelectCurrencyValue, setSingleSelectCurrencyValue] = useState<string>("");
        
<CurrencySelector
  label={t("currencySelector.label")}
  name="currencySelector"
  currencyOptions={[
    { code: "AUD", label: "Australian Dollar", symbol: "$", value: "AUD" },
    { code: "USD", label: "US Dollar", symbol: "$", value: "USD" },
    { code: "GBP", label: "British Pound", symbol: "£", value: "GBP" },
    { code: "EUR", label: "Euro", symbol: "€", value: "EUR" },
    { code: "JPY", label: "Japanese Yen", symbol: "¥", value: "JPY" },
  ]}
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectCurrencyValue(value)}
  placeholder={t("currencySelector.placeholder")}
/>'
        />
        <p>
          <Trans
            i18nKey={"ui:select.autoSortOptionsInfo"}
            components={{ code: <code /> }}
          ></Trans>
        </p>
      </Section>
      <Section title={t("currencySelector.usage.singleSearch")}>
        <CurrencySelector
          label={t("currencySelector.label")}
          name="currencySelector"
          enableSearch
          currencyOptions={currencyOptions}
          value={searchableSingleSelectCurrencyValue}
          onChange={(value: string) =>
            setSearchableSingleSelectCurrencyValue(value)
          }
          placeholder={t("currencySelector.placeholder")}
          searchPlaceholder={t("currencySelector.searchPlaceholder")}
        />
        <CodeBlock
          exampleCode='
const [searchableSingleSelectCurrencyValue, setSearchableSingleSelectCurrencyValue] = useState<string>("");
      
<CurrencySelector
  label={t("select.label")}
  name="currencySelector"
  enableSearch
  currencyOptions={[
    { code: "AUD", label: "Australian Dollar", symbol: "$", value: "AUD" },
    { code: "USD", label: "US Dollar", symbol: "$", value: "USD" },
    { code: "GBP", label: "British Pound", symbol: "£", value: "GBP" },
    { code: "EUR", label: "Euro", symbol: "€", value: "EUR" },
    { code: "JPY", label: "Japanese Yen", symbol: "¥", value: "JPY" },
  ]}
  value={searchableSingleSelectCurrencyValue}
  onChange={(value: string) => setSearchableSingleSelectCurrencyValue(value)}
  placeholder={t("currencySelector.placeholder")}
  searchPlaceholder={t("currencySelector.searchPlaceholder")}
  />'
        />
      </Section>
      <Section title={t("currencySelector.usage.multiple")}>
        <CurrencySelector
          label={t("currencySelector.label")}
          name="currencySelector"
          currencyOptions={currencyOptions}
          multiple={true}
          value={multiSelectCurrencyValue}
          onChange={(value: string[]) => setMultiSelectCurrencyValue(value)}
          placeholder={t("currencySelector.multiSelectPlaceholder")}
        />
        <CodeBlock
          exampleCode='
const [multiSelectCurrencyValue, setMultiSelectCurrencyValue] = useState<string[]>([]);
      
<Select
  label={t("currencySelector.label")}
  name="currencySelector"
  currencyOptions={[
    { code: "AUD", label: "Australian Dollar", symbol: "$", value: "AUD" },
    { code: "USD", label: "US Dollar", symbol: "$", value: "USD" },
    { code: "GBP", label: "British Pound", symbol: "£", value: "GBP" },
    { code: "EUR", label: "Euro", symbol: "€", value: "EUR" },
    { code: "JPY", label: "Japanese Yen", symbol: "¥", value: "JPY" },
  ]}
  multiple={true}
  value={multiSelectCurrencyValue}
  onChange={(value: string[]) => setMultiSelectCurrencyValue(value)}
  placeholder={t("currencySelector.multiSelectPlaceholder")}
  />'
        />
      </Section>
    </Page>
  );
};
