import { Meta, StoryFn } from "@storybook/react";
import React from "react";

import Page from "./index";

type PageType = typeof Page;
type PageProperties = Meta<PageType>;

const PageStory: PageProperties = {
  title: "UI/Page",
  component: Page,
};

const Template: StoryFn<PageType> = (arguments_) => <Page {...arguments_} />;

export const Loading: PageProperties = Template.bind({});
export const CustomLoadingComponent: PageProperties = Template.bind({});
export const Error: PageProperties = Template.bind({});
export const TitleAndSubtitle: PageProperties = Template.bind({});
export const Toolbar: PageProperties = Template.bind({});

Loading.args = {
  loading: true,
};

CustomLoadingComponent.args = {
  loading: true,
  loadingComponent: <span>Loading...</span>,
};

TitleAndSubtitle.args = {
  title: "This is the title of this page",
  subtitle: "This is the subtitle of this page",
};

Toolbar.args = {
  toolbar: (
    <>
      <button>Action one</button>
      <button>Action two</button>
    </>
  ),
};

Error.args = {
  errorMessage: "404: Not found",
};

export default PageStory;
