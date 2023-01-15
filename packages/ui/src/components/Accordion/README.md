# Accordion component

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

import { Accordion, SubPane } from "@dzangolab/react-ui";


const Page: React.FC<Properties> = ({ children }) => {
  return (
    <Accordion>
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
    </Accordion>
  );
};

export default Page
```

## Props

### Accordion

| Prop      | Type                       | Description                                      | Default      |
|-----------|----------------------------|--------------------------------------------------|--------------|
| direction | `horizontal` \| `vertical` | The direction ui which the accordion is laid out | `vertical`   |

### SubPane

| Prop  | Type     | Description                                     | Default      |
|-------|----------|-------------------------------------------------|--------------|
| icon  | `string` | The icon to display in the subpane's title area | None         |
| title | `string` | The text to display in the subpan'es title area | None         |
