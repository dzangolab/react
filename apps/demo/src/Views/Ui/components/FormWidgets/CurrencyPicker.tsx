import { Trans, useTranslation } from "@dzangolab/react-i18n";
import { CurrencyPicker, Page, Button } from "@dzangolab/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../../components/Demo";

export const CurrencyPickerDemo = () => {
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
      title={t("currencyPicker.title")}
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
        <p>{t("common.usage", { component: "CurrencyPicker" })}</p>
        <CodeBlock exampleCode='import { CurrencyPicker } from "@dzangolab/react-ui"' />
      </Section>

      <Section title={t("currencyPicker.usage.basic")}>
        <CurrencyPicker
          label={t("currencyPicker.label")}
          name="currencyPicker"
          currencyOptions={currencyOptions}
          value={singleSelectCurrencyValue}
          onChange={(value: string) => setSingleSelectCurrencyValue(value)}
          placeholder={t("currencyPicker.placeholder")}
        />
        <CodeBlock
          exampleCode='
const [singleSelectCurrencyValue, setSingleSelectCurrencyValue] = useState<string>("");
        
<CurrencyPicker
  label={t("currencyPicker.label")}
  name="currencyPicker"
  currencyOptions={[
    { code: "AUD", label: "Australian Dollar", symbol: "$", value: "AUD" },
    { code: "USD", label: "US Dollar", symbol: "$", value: "USD" },
    { code: "GBP", label: "British Pound", symbol: "£", value: "GBP" },
    { code: "EUR", label: "Euro", symbol: "€", value: "EUR" },
    { code: "JPY", label: "Japanese Yen", symbol: "¥", value: "JPY" },
  ]}
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectCurrencyValue(value)}
  placeholder={t("currencyPicker.placeholder")}
/>'
        />
        <p>
          <Trans
            i18nKey={"ui:select.autoSortOptionsInfo"}
            components={{ code: <code /> }}
          ></Trans>
        </p>
      </Section>
      <Section title={t("currencyPicker.usage.singleSearch")}>
        <CurrencyPicker
          label={t("currencyPicker.label")}
          name="currencyPicker"
          enableSearch
          currencyOptions={currencyOptions}
          value={searchableSingleSelectCurrencyValue}
          onChange={(value: string) =>
            setSearchableSingleSelectCurrencyValue(value)
          }
          placeholder={t("currencyPicker.placeholder")}
          searchPlaceholder={t("currencyPicker.searchPlaceholder")}
        />
        <CodeBlock
          exampleCode='
const [searchableSingleSelectCurrencyValue, setSearchableSingleSelectCurrencyValue] = useState<string>("");
      
<CurrencyPicker
  label={t("select.label")}
  name="currencyPicker"
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
  placeholder={t("currencyPicker.placeholder")}
  searchPlaceholder={t("currencyPicker.searchPlaceholder")}
  />'
        />
      </Section>
      <Section title={t("currencyPicker.usage.multiple")}>
        <CurrencyPicker
          label={t("currencyPicker.label")}
          name="currencyPicker"
          currencyOptions={currencyOptions}
          multiple={true}
          value={multiSelectCurrencyValue}
          onChange={(value: string[]) => setMultiSelectCurrencyValue(value)}
          placeholder={t("currencyPicker.multiSelectPlaceholder")}
        />
        <CodeBlock
          exampleCode='
const [multiSelectCurrencyValue, setMultiSelectCurrencyValue] = useState<string[]>([]);
      
<CurrencyPicker
  label={t("currencyPicker.label")}
  name="currencyPicker"
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
  placeholder={t("currencyPicker.multiSelectPlaceholder")}
  />'
        />
      </Section>
    </Page>
  );
};
