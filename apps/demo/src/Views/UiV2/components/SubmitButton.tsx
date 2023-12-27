import { useTranslation } from "@dzangolab/react-i18n";
import { Page, SubmitButton } from "@dzangolab/react-ui";

export const SubmitButtonDemo = () => {
  const [t] = useTranslation("ui");

  return (
    <Page title={t("v2.submitButton.title")}>
      <div>
        <p>
          We have dedicated submit button component <code>SubmitButton</code>{" "}
          which has <code>type="submit"</code> by default and supports loading
          state.
        </p>
        <SubmitButton label={t("v2.submitButton.label.submit")} />
        <SubmitButton
          label={t("v2.submitButton.label.submitLoading")}
          loading
        />
      </div>
    </Page>
  );
};
