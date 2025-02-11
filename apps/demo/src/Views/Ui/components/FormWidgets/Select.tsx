import { useTranslation } from "@dzangolab/react-i18n";
import { Select, Page, Button } from "@dzangolab/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../../components/Demo";

type Option = {
  value: number | string;
  label: string;
  disabled?: boolean;
};

export const SelectDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const [multiselectValue, setMultiselectValue] = useState<string[]>([]);
  const [searchableMultiselectValue, setSearchableMultiselectValue] = useState<
    string[]
  >([]);
  const [searchableSingleSelectValue, setSearchableSingleSelectValue] =
    useState<string>("");
  const [singleSelectValue, setSingleSelectValue] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [renderedValue, setRenderedValue] = useState<string[]>([]);
  const [renderedOption, setRenderedOption] = useState<string[]>([]);

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
          onChange={(value: number) => setSingleSelectValue(value)}
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
          onChange={(value: string[]) => setMultiselectValue(value)}
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
          onChange={(value: string) => setSelectedValue(value)}
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
          onChange={(value: string[]) => setRenderedValue(value)}
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
          onChange={(value: string[]) => setRenderedOption(value)}
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
          onChange={(value: string) => setSearchableSingleSelectValue(value)}
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
          onChange={(value: string[]) => setSearchableMultiselectValue(value)}
          placeholder={t("select.placeholder")}
          searchPlaceholder={t("select.searchPlaceholder")}
        />
      </Section>
    </Page>
  );
};
