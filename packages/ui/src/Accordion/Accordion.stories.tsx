import "../../public/tab-theme.css";
import { Meta, StoryFn } from "@storybook/react";
import React from "react";

import { SubPane } from "../index";

import { Accordion } from "./index";

type AccordionType = typeof Accordion;
type AccordionProperties = Meta<AccordionType>;

const AccordionStory: AccordionProperties = {
  title: "UI/Accordion",
  component: Accordion,
};

const Template: StoryFn<AccordionType> = (arguments_) => (
  <Accordion {...arguments_}>
    <SubPane icon="icon1.jpg" title="Topic 1">
      Pane 1 content
    </SubPane>
    <SubPane icon="icon2.jpg" title="Topic 2">
      Pane 2content
    </SubPane>
  </Accordion>
);

export const ActiveIndex: AccordionProperties = Template.bind({});
export const HorizontalDirection: AccordionProperties = Template.bind({});
export const VerticalDirection: AccordionProperties = Template.bind({});
export const CanSelfCollapse: AccordionProperties = Template.bind({});
export const CustomToggleIcons: AccordionProperties = Template.bind({});

ActiveIndex.args = {
  defaultActiveIndex: 1,
};

HorizontalDirection.args = {
  direction: "horizontal",
};

VerticalDirection.args = {
  direction: "vertical",
};

CanSelfCollapse.args = {
  canSelfCollapse: true,
};

CustomToggleIcons.args = {
  activeIcon: "icon1.jpg",
  inactiveIcon: "icon2.jpg",
};

export default AccordionStory;
