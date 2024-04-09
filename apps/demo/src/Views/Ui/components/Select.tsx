import { useTranslation } from "@dzangolab/react-i18n";
import { Select, Page } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../components/Demo";

type Option = {
  value: number | string;
  label: string;
  disabled?: boolean;
};

export const SelectDemo = () => {
  const [t] = useTranslation("ui");
  const [multipleSelectedValues, setMultipleSelectedValues] = useState<
    string[]
  >([]);
  const [singleSelectedValues, setSingleSelectedValues] = useState<number[]>(
    [],
  );
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [renderedValue, setRenderedValue] = useState<string[]>([]);
  const [renderedOption, setRenderedOption] = useState<string[]>([]);

  const renderSelectedValue = (value?: string[], options?: Option[]) => {
    return (
      <span>
        {value
          ?.map(
            (value_) =>
              options?.find((option) => option.value === value_)?.label,
          )
          .join(", ")}
      </span>
    );
  };

  const renderOption = (option: any) => {
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
          value={singleSelectedValues}
          onChange={(value: number[]) => setSingleSelectedValues(value)}
          placeholder={t("select.placeHolder")}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.multiple")}
          name="select"
          options={[
            { value: "FR", label: "FRANCE" },
            { value: "DE", label: "DENMARK" },
            { value: "BE", label: "BELGIUM" },
            { value: "SA", label: "SANTIAGO" },
            { value: "AR", label: "ARGENTINA" },
            { value: "SR", label: "SRILANKA", disabled: true },
            { value: "NP", label: "NEPAL" },
            { value: "NS", label: "NETHERLAND" },
            { value: "SN", label: "SUDAN" },
            { value: "PN", label: "POLAND" },
          ]}
          multiple={true}
          value={multipleSelectedValues}
          onChange={(value: string[]) => setMultipleSelectedValues(value)}
          placeholder={t("select.placeHolder")}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.invalid")}
          name="select"
          options={[
            { value: "FR", label: "FR" },
            { value: "DE", label: "DE" },
            { value: "BE", label: "BE" },
            { value: "AR", label: "AR" },
          ]}
          value={selectedValues}
          onChange={(value: string[]) => setSelectedValues(value)}
          hasError={true}
          errorMessage="Required field"
          placeholder={t("select.placeHolder")}
        />
      </Section>
      <Section>
        <Select
          label={t("select.label.renderValue")}
          name="select"
          options={[
            { value: "1", label: "FR" },
            { value: "DE", label: "DE" },
            { value: "3", label: "BE" },
            { value: "FE", label: "FE" },
            { value: "RE", label: "RE" },
          ]}
          value={renderedValue}
          onChange={(value: string[]) => setRenderedValue(value)}
          renderValue={renderSelectedValue}
          multiple
          placeholder={t("select.placeHolder")}
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
          multiple
          placeholder={t("select.placeHolder")}
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
        />
      </Section>
    </Page>
  );
};
