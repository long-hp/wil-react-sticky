# Wil React Sticky
Sticky Component For Header, Sidebar ...

### Installation

**npm**

```bash
npm install wil-react-sticky --save
```

**yarn**

```bash
yarn add wil-react-sticky
```

**Example**

#### [1. Sidebar sticky](https://6qzgv.codesandbox.io/)
#### [2. Sidebar sticky box 2](https://6qzgv.codesandbox.io/sticky-box2)
#### [3. Header sticky](https://6qzgv.codesandbox.io/header-sticky)

```js
import React from "react";
import Sticky from "wil-react-sticky";

class BasicSticky extends React.Component {
  render() {
    return (
      <div>
        <Sticky>
          <header className="header">Header sticky</header>
        </Sticky>
      </div>
    )
  }
```

**API**

| Prop                  | Type                                | Default | Description |
| :---------            | :-------:                           | :-----: | :----------- |
| containerSelectorFocus   | `string`                     | -       | Move according to the parent component (value same `querySelector` vanilla javascript). Example [Sidebar sticky](https://6qzgv.codesandbox.io/)  |
| offsetTop             | `number`                     | `0`       | Offset from the top of the viewport (in pixels) |
| zIndex    | `number`      | `10`       | The `z-index` of the Sticky |
| stickyEnableRange    | `Array<number>`      | `[0, Infinity]`       | Sticky working in [min-width, max-width]  |
