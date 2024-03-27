import { useTranslation } from "@dzangolab/react-i18n";
import { Select, Page } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../components/Demo";

export const SelectDemo = () => {
  const [t] = useTranslation("ui");
  const [multipleSelectedValues, setMultipleSelectedValues] = useState<
    string[]
  >([]);
  const [singleSelectedValues, setSingleSelectedValues] = useState<number[]>(
    [],
  );
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <Page title={t("select.title")}>
      <Section>
        <Select
          label={t("select.label.single")}
          name="select"
          options={[
            { value: 11, label: "option 1" },
            { value: 23, label: "option 2" },
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
            { value: "FR", label: "FR" },
            { value: "DE", label: "DE" },
            { value: "BE", label: "BE" },
            { value: "AR", label: "AR" },
            { value: "RE", label: "RE" },
            { value: "SA", label: "SA" },
            { value: "ME", label: "ME" },
          ]}
          multiple={true}
          value={multipleSelectedValues}
          onChange={(value: string[]) => setMultipleSelectedValues(value)}
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
          placeholder={t("select.label.disabled")}
          disabled={true}
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
          placeholder={t("select.placeHolder")}
          hasError={true}
        />
      </Section>
    </Page>
  );
};
