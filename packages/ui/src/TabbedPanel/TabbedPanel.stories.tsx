import "../../public/tab-theme.css";
import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { SubPane } from "../index";

import { TabbedPanel } from "./index";

type TabbedPanelType = typeof TabbedPanel;
type TabbedPanelProperties = Meta<TabbedPanelType>;

const TabbedPanelStory: TabbedPanelProperties = {
  title: "UI/TabbedPanel",
  component: TabbedPanel,
};

const Template: StoryFn<TabbedPanelType> = (arguments_) => (
  <TabbedPanel {...arguments_}>
    <SubPane icon="https://tinyurl.com/yw5ack2m" title="Topic 1">
      Pane 1 content
    </SubPane>
    <SubPane icon="https://tinyurl.com/5cjtm2y7" title="Topic 2">
      Pane 2content
    </SubPane>
  </TabbedPanel>
);

export const TopOrientation: TabbedPanelProperties = Template.bind({});
export const BottomOrientation: TabbedPanelProperties = Template.bind({});
export const LeftOrientation: TabbedPanelProperties = Template.bind({});
export const RightOrientation: TabbedPanelProperties = Template.bind({});

TopOrientation.args = {
  position: "top",
};

BottomOrientation.args = {
  position: "bottom",
};

LeftOrientation.args = {
  position: "left",
};

RightOrientation.args = {
  position: "right",
};

export default TabbedPanelStory;
