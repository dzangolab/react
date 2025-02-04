import { useTranslation } from "@dzangolab/react-i18n";
import { Select, Page } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../../components/Demo";

type Option = {
  value: number | string;
  label: string;
  disabled?: boolean;
};

export const SelectDemo = () => {
  const [t] = useTranslation("ui");

  const [multiselectValue, setMultiselectValue] = useState<string | string[]>(
    [],
  );
  const [searchableMultiselectValue, setSearchableMultiselectValue] = useState<
    string | string[]
  >([]);
  const [searchableSingleSelectValue, setSearchableSingleSelectValue] =
    useState<string | string[]>("");
  const [singleSelectValue, setSingleSelectValue] = useState<number | number[]>(
    0,
  );
  const [selectedValue, setSelectedValue] = useState<string | string[]>("");
  const [renderedValue, setRenderedValue] = useState<string | string[]>([]);
  const [renderedOption, setRenderedOption] = useState<string | string[]>([]);

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

  const renderOption = (option: Option) => {
    return (
      <div>
        <i className="pi pi-user"></i>
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <Page title={t("select.title")}>
      <Section>
        <Select
          label={t("select.label.single")}
          name="select"
          options={[
            { value: 11, label: "option 1", disabled: true },
            { value: 23, label: "option 2" },
            { value: 27, label: "option 3" },
          ]}
          value={singleSelectValue}
          onChange={(value: number | number[]) => setSingleSelectValue(value)}
          placeholder={t("select.placeholder")}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.multiple")}
          name="select"
          options={[
            { value: "AR", label: "ARGENTINA" },
            { value: "BE", label: "BELGIUM" },
            { value: "DE", label: "DENMARK" },
            { value: "FR", label: "FRANCE" },
            { value: "NP", label: "NEPAL" },
            { value: "NS", label: "NETHERLAND" },
            { value: "PN", label: "POLAND" },
            { value: "SA", label: "SANTIAGO" },
            { value: "SR", label: "SRILANKA", disabled: true },
            { value: "SN", label: "SUDAN" },
          ]}
          multiple={true}
          value={multiselectValue}
          onChange={(value: string | string[]) => setMultiselectValue(value)}
          placeholder={t("select.placeholder")}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.invalid")}
          name="select"
          options={[
            { value: "AR", label: "AR" },
            { value: "BE", label: "BE" },
            { value: "DE", label: "DE" },
            { value: "FR", label: "FR" },
          ]}
          value={selectedValue}
          onChange={(value: string | string[]) => setSelectedValue(value)}
          hasError={true}
          errorMessage="Required field"
          placeholder={t("select.placeholder")}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.renderValue")}
          name="select"
          options={[
            { value: "BE", label: "BE" },
            { value: "DE", label: "DE" },
            { value: "FE", label: "FE" },
            { value: "FR", label: "FR" },
            { value: "RE", label: "RE" },
          ]}
          value={renderedValue}
          onChange={(value: string | string[]) => setRenderedValue(value)}
          renderValue={renderSelectedValue}
          multiple={true}
          placeholder={t("select.placeholder")}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.renderOption")}
          name="select"
          options={[
            { value: "FE", label: "option 1" },
            { value: "DE", label: "option 2" },
            { value: "SA", label: "option 3" },
          ]}
          value={renderedOption}
          onChange={(value: string | string[]) => setRenderedOption(value)}
          renderOption={renderOption}
          multiple={true}
          placeholder={t("select.placeholder")}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.disabled")}
          name="select"
          options={[{ value: "FR", label: "FR" }]}
          value={[]}
          onChange={() => {}}
          disabled={true}
          multiple={true}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.singleSearch")}
          name="select"
          enableSearch
          options={[
            { value: "AR", label: "ARGENTINA" },
            { value: "BE", label: "BELGIUM" },
            { value: "DE", label: "DENMARK" },
            { value: "FR", label: "FRANCE" },
            { value: "NP", label: "NEPAL" },
            { value: "NS", label: "NETHERLAND" },
            { value: "PN", label: "POLAND" },
            { value: "SA", label: "SANTIAGO" },
            { value: "SR", label: "SRILANKA", disabled: true },
            { value: "SN", label: "SUDAN" },
          ]}
          value={searchableSingleSelectValue}
          onChange={(value: string | string[]) =>
            setSearchableSingleSelectValue(value)
          }
          placeholder={t("select.placeholder")}
          searchPlaceholder={t("select.searchPlaceholder")}
        />
      </Section>
      <Section>
        <Select
          enableSearch
          label={t("select.label.multipleSearch")}
          name="select"
          options={[
            { value: "AR", label: "ARGENTINA" },
            { value: "BE", label: "BELGIUM" },
            { value: "DE", label: "DENMARK" },
            { value: "FR", label: "FRANCE" },
            { value: "NP", label: "NEPAL" },
            { value: "NS", label: "NETHERLAND" },
            { value: "PN", label: "POLAND" },
            { value: "SA", label: "SANTIAGO" },
            { value: "SR", label: "SRILANKA", disabled: true },
            { value: "SN", label: "SUDAN" },
          ]}
          multiple={true}
          value={searchableMultiselectValue}
          onChange={(value: string | string[]) =>
            setSearchableMultiselectValue(value)
          }
          placeholder={t("select.placeholder")}
          searchPlaceholder={t("select.searchPlaceholder")}
        />
      </Section>
    </Page>
  );
};
