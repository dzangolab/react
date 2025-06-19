import { Trans, useTranslation } from "@dzangolab/react-i18n";
import { Select, Page, Button } from "@dzangolab/react-ui";
import { TDataTable } from "@dzangolab/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../../components/Demo";

type Option = {
  value: number | string;
  label: string;
  disabled?: boolean;
};

const data = [
  {
    id: 1,
    prop: "autoSortOptions",
    type: "boolean",
    default: "true",
    description:
      "By default, options are sorted alphabetically by label. If set to false, the order of options is preserved.",
  },
  {
    id: 2,
    prop: "autoSelectSingleOption",
    type: "boolean",
    default: "false",
    description:
      "If true, in case of single option it automatically gets selected.",
  },
  {
    id: 3,
    prop: "className",
    type: "string",
    default: "-",
    description: "Additional CSS classes for styling.",
  },
  {
    id: 4,
    prop: "disabled",
    type: "boolean",
    default: "-",
    description: "Disables the select component.",
  },
  {
    id: 5,
    prop: "errorMessage",
    type: "string",
    default: "-",
    description: "Displays an error message below the component.",
  },
  {
    id: 6,
    prop: "hasError",
    type: "boolean",
    default: "-",
    description: "If true, error in component.",
  },
  {
    id: 7,
    prop: "helperText",
    type: "string",
    default: "-",
    description: "Displays an error message below the component.",
  },
  {
    id: 8,
    prop: "hideIfSingleOption",
    type: "boolean",
    default: "false",
    description:
      "If there is only one option, and multiple is false, the Select component will not render the dropdown at all when set to true.",
  },
  {
    id: 9,
    prop: "label",
    type: "string",
    default: "-",
    description: "Label of the component.",
  },
  {
    id: 10,
    prop: "multiple",
    type: "boolean",
    default: "false",
    description: "If true, multiple selection is enabled.",
  },
  {
    id: 11,
    prop: "name",
    type: "string",
    default: "-",
    description: "Name of the component.",
  },
  {
    id: 12,
    prop: "options",
    type: "Option[]",
    default: "-",
    description: "Options to pass in the select component.",
  },
  {
    id: 13,
    prop: "placeholder",
    type: "string",
    default: "-",
    description: "Placeholder in the component.",
  },
  {
    id: 14,
    prop: "showRemoveSelection",
    type: "boolean",
    default: "true",
    description: "If true, icon to remove selected options is visible.",
  },
  {
    id: 15,
    prop: "value",
    type: "Value",
    default: "-",
    description: "Selected values of the component.",
  },
  {
    id: 16,
    prop: "renderOption",
    type: "(option: Option[]) => React.ReactNode",
    default: "-",
    description: "Function to be called to render custom select options.",
  },
  {
    id: 17,
    prop: "renderValue",
    type: "(value?: Value, options?: Option[]) => React.ReactNode",
    default: "-",
    description: "Function to be called to render custom select value.",
  },
  {
    id: 18,
    prop: "onChange",
    type: " (newValue: T | T[]) => void",
    default: "-",
    description: "Function to be called when value changes.",
  },
];

export const SelectDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const [multiselectValue, setMultiselectValue] = useState<string[]>([]);

  const [singleSelectValue, setSingleSelectValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [renderedValue, setRenderedValue] = useState<string[]>([]);
  const [renderedOption, setRenderedOption] = useState<string[]>([]);

  const renderSelectedValue = (
    value?: string | string[],
    options?: Option[],
  ) => {
    let label = "";

    if (Array.isArray(value)) {
      label = value
        .map((v) => options?.find((o) => o.value === v)?.label)
        .filter(Boolean)
        .join(", ");
    }

    return <span>{label || t("select.placeholder")}</span>;
  };

  const renderOption = (option: Option) => {
    return (
      <div>
        <i className="pi pi-user"></i>
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <Page
      title={t("select.title")}
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
        <p>{t("common.usage", { component: "Select" })}</p>
        <CodeBlock exampleCode='import { Select } from "@dzangolab/react-ui"' />
      </Section>

      <Section title={t("select.usage.basic")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[{ label: "French", value: "fr" }]}
          value={singleSelectValue}
          onChange={(value: string) => setSingleSelectValue(value)}
          placeholder={t("select.placeholder")}
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");

<Select
  label={t("select.label")}
  name="select"
  options={[
    { label: "French", value: "fr"},
    { label: "German", value: "de"},
    { disabled: true, label: "Dutch", value: "be", },
    { label: "Nepali", value: "np",  },
    { label: "Hindi", value: "hi" },
  ]}
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectValue(value)}
  placeholder={t("select.placeholder")}
/>'
        />
        <p>
          <Trans
            i18nKey={"ui:select.autoSortOptionsInfo"}
            components={{ code: <code /> }}
          ></Trans>
        </p>
      </Section>
      <Section title={t("select.usage.disabled")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[{ value: "np", label: "Nepali" }]}
          value="np"
          onChange={() => {}}
          disabled={true}
        />
        <CodeBlock
          exampleCode='
<Select
  label={t("select.label")}
  name="select"
  options={[{ value: "np", label: "Nepali" }]}
  value="np"
  onChange={() => {}}
  disabled={true}
/>'
        />
      </Section>

      <Section title={t("select.usage.multiple")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { disabled: true, label: "Dutch", value: "be" },
            { label: "Nepali", value: "np" },
            { label: "Hindi", value: "hi" },
          ]}
          multiple={true}
          value={multiselectValue}
          onChange={(value: string[]) => setMultiselectValue(value)}
          placeholder={t("select.multiSelectPlaceholder")}
        />
        <CodeBlock
          exampleCode='
const [multiselectValue, setMultiselectValue] = useState<string[]>([]);

<Select
  label={t("select.label")}
  name="select"
  options={[
    { label: "French", value: "fr"},
    { label: "German", value: "de"},
    { disabled: true, label: "Dutch", value: "be", },
    { label: "Nepali", value: "np",  },
    { label: "Hindi", value: "hi" },
  ]}
  multiple={true}
  value={multiselectValue}
  onChange={(value: string[]) => setMultiselectValue(value)}
  placeholder={t("select.multiSelectPlaceholder")}
/>       '
        />
      </Section>

      <Section title={t("select.usage.renderValue")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { disabled: true, label: "Dutch", value: "be" },
            { label: "Nepali", value: "np" },
            { label: "Hindi", value: "hi" },
          ]}
          value={renderedValue}
          onChange={(value: string[]) => setRenderedValue(value)}
          renderValue={renderSelectedValue}
          multiple={true}
          placeholder={t("select.multiSelectPlaceholder")}
        />
        <CodeBlock
          exampleCode='
const [renderedValue, setRenderedValue] = useState<string[]>([]);

const renderSelectedValue = (
  value?: string | string[],
  options?: Option[],
) => {
  return (
    <span>
      {Array.isArray(value) &&
        value
          ?.map(
            (value_) =>
              options?.find((option) => option.value === value_)?.label,
          )
          .join(", ")}
    </span>
  );
};

<Select
  label={t("select.label")}
  name="select"
  options={[
    { label: "French", value: "fr"},
    { label: "German", value: "de"},
    { disabled: true, label: "Dutch", value: "be", },
    { label: "Nepali", value: "np",  },
    { label: "Hindi", value: "hi" },
  ]}
  value={renderedValue}
  onChange={(value: string[]) => setRenderedValue(value)}
  renderValue={renderSelectedValue}
  multiple={true}
  placeholder={t("select.multiSelectPlaceholder")}
/>'
        />
      </Section>
      <Section title={t("select.usage.renderOption")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { disabled: true, label: "Dutch", value: "be" },
            { label: "Nepali", value: "np" },
            { label: "Hindi", value: "hi" },
          ]}
          value={renderedOption}
          onChange={(value: string[]) => setRenderedOption(value)}
          renderOption={renderOption}
          multiple={true}
          placeholder={t("select.multiSelectPlaceholder")}
        />
        <CodeBlock
          exampleCode='
const [renderedOption, setRenderedOption] = useState<string[]>([]);

const renderOption = (option: Option) => {
  return (
    <div>
      <i className="pi pi-user"></i>
      <span>{option.label}</span>
    </div>
  );
};

<Select
  label={t("select.label")}
  name="select"
  options={[
    { label: "French", value: "fr"},
    { label: "German", value: "de"},
    { disabled: true, label: "Dutch", value: "be", },
    { label: "Nepali", value: "np",  },
    { label: "Hindi", value: "hi" },
  ]}
  value={renderedOption}
  onChange={(value: string[]) => setRenderedOption(value)}
  renderOption={renderOption}
  multiple={true}
  placeholder={t("select.multiSelectPlaceholder")}
/>'
        />
      </Section>

      <Section title={t("select.usage.invalid")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { disabled: true, label: "Dutch", value: "be" },
            { label: "Nepali", value: "np" },
            { label: "Hindi", value: "hi" },
          ]}
          value={selectedValue}
          onChange={(value: string) => setSelectedValue(value)}
          hasError={true}
          errorMessage="Required field"
          placeholder={t("select.placeholder")}
        />
        <CodeBlock
          exampleCode='
const [selectedValue, setSelectedValue] = useState<string>("");

<Select
  label={t("select.label")}
  name="select"
  options={[
    { label: "French", value: "fr"},
    { label: "German", value: "de"},
    { disabled: true, label: "Dutch", value: "be", },
    { label: "Nepali", value: "np",  },
    { label: "Hindi", value: "hi" },
  ]}
  value={selectedValue}
  onChange={(value: string) => setSelectedValue(value)}
  hasError={true}
  errorMessage="Required field"
  placeholder={t("select.placeholder")}
/>'
        />
      </Section>
      <Section
        title={t("headers.propertiesValue", {
          value: "ISelectProperties",
        })}
      >
        <TDataTable
          columns={[
            {
              accessorKey: "prop",
              header: "Properties",
            },
            {
              accessorKey: "type",
              header: "Type",
            },
            {
              accessorKey: "default",
              header: "Default",
            },
            {
              accessorKey: "description",
              header: "Description",
            },
          ]}
          data={data}
          paginated={false}
        />
      </Section>

      <Section title="Type">
        <CodeBlock
          exampleCode="
type Option<T extends string | number> = {
  disabled?: boolean;
  label: string;
  value: T;
};

type Value = string | number | (string | number)[]
"
        />
      </Section>
    </Page>
  );
};
