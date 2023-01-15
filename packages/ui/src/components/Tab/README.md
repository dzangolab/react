# TabbedPanel component

## Installation

### npm

```
npm install @dzangolab/react-ui
```

### yarn

```
yarn add @dzangolab/react-ui
```

### pnpm

```
pnpm add @dzangolab/react-ui
```

## Usage

```
import React, { ReactNode } from "react";

import { SubPane, TabbedPanel } from "@dzangolab/react-ui";


const Page: React.FC<Properties> = ({ children }) => {
  return (
    <TabbedPanel>
      <SubPane
        icon="icon1.jpg"
        title="Topic 1">
        Pane 1 content
      </SubPane>
      <SubPane
        icon="icon2.jpg"
        title="Topic 2">
        Pane 2content
      </SubPane>
    </TabbedPanel>
  );
};

export default Page
```

## Props

### Accordion

| Prop      | Type                       | Description                                      | Default      |
|-----------|----------------------------|--------------------------------------------------|--------------|
| position  | `top` \| `left` \| `bottom` \| `right` | The position of the tabs relative to the tabbed pane. | `top`

### SubPane

| Prop  | Type     | Description                                     | Default      |
|-------|----------|-------------------------------------------------|--------------|
| icon  | `string` | The icon to display in the subpane's title area | None         |
| title | `string` | The text to display in the subpan'es title area | None         |
