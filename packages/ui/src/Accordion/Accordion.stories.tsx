import "../../public/accordion-theme.css";
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
    <SubPane icon="https://tinyurl.com/yw5ack2m" title="Topic 1">
      Pane 1 content
    </SubPane>
    <SubPane icon="https://tinyurl.com/5cjtm2y7" title="Topic 2">
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
  activeIcon: "https://tinyurl.com/2p8n4ee2",
  inactiveIcon: "https://tinyurl.com/6weej9xx",
};

export default AccordionStory;
