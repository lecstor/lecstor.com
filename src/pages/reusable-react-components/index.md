---
title: Reusable React Components [WIP]
date: "2018-12-09T11:42:00.000Z"
---

- [Margins](#margins) - don't give components external margins, use layout components instead
- [Unhandled Props](#unhandled-props) - pass unhandled props to the rendered element
- [Component Composition](#component-composition)
- [Containers](#containers)

## Margins

Don't give components external margins, use layout components instead.

Setting external margins on your component forces the user of the component to
either accept, work around, or override those margins, especially when there
are conflicting margins on adjacent elements.

Wrapping components in simple divs with padding or margins will keep your
components more easily reusable. (see [Containers](#containers))

## Unhandled Props

Passing unhandled props to the rendered element will allow it to be styled via
`style` and `className` and allow event handlers to be set so your component
can be used in ways you didn't forsee.

eg I needed to add a tooltip to one of my components and the tooltip component
needed to add `onMouseEnter` & `onMouseLeave` handlers to my button.

This is simple to implement using the ES6 `rest` operator, eg

```
const Button = ({ label, ...props }) = <button {...props}>{label}</button>;
```

### Typescript

If you are using Typescript you'll need to type your component props
accordingly to avoid TS errors when trying to apply unhandled props to the
component. Refer to the source of `@types/react/index.d.ts` that you are
using to see what's available.

```
export type ButtonProps = {
  label: string;
} & React.HTMLAttributes<HTMLButtonElement>;
```

## Component Composition

### Elements as props

Use the `children` prop or other props that take elements to be rendered.

```
const Button1 = ({ ...props }) = <button {...props} />;
const Button2 = ({ label, ...props }) = <button {...props}>{label}</button>;
```

### Specialization

Start with a component that implements the simplest functionality you will need
while ensuring that it is as customisable as possible.

```
const ModeButton = ({ primary, danger, style, ...props }) = {
  const backgroundColor = primary ? "blue" : danger ? "red" : "white";
  return (<button {...props} style={{ backgroundColor, ...style }} />);
}
```

You can then create other components that add more functionality..

```
const SizedModeButton = ({ small, large, style, ...props }) = {
  const padding = small ? "0.5rem" : large ? "1rem" : "0.7rem";
  return <ModeButton primary {...props} style={{ ...style, padding }} />;
}
```

..or configure those components for specific use cases.

```
const LargePrimaryButton = (props) = {
  return <SizedModeButton large primary {...props} />;
}
```

## Containers

Container components are great because they are very easy to make completely
customisable, though naming is hard and and deciding when to customise and when
to create a new container (and name it) wil be an ongoing dilemma.

Using container components also helps you keep your other components more
reusable by avoiding setting styles on them that will invariably need to be
customised for different use-cases.

By setting default styles on a container component, but also allowing
`className` and `style` props to be specified, your container components will
be simple to use and tweak.

```javascript
import styled from "styled-components";

const Box = styled.div`
  padding: 5px;
  width: 100%;

  @media (min-width: 700px) {
    padding: 20px;
    width: 50%;
  }
`;

const InputContainer = ({ children, className, style }) => {
  <Box className={className} style={style}>
    {children}
  </Box>;
};

export default InputContainer;
```

## Render-props and Higher-order Components

Component logic can be shared by many components by encapsulating it in it's
own component. These components can be built as
[Higher-order Components](https://reactjs.org/docs/higher-order-components.html)
or utilise [render props](https://reactjs.org/docs/render-props.html).

Higher-order components are functions that take a component and return a new
component with enhanced capabilities and are applied to a single, complete
components.

The render props pattern allows a component to accept one or more components as
props to be rendered with customised props provided by the parent component.

For ultimate flexibility, depending on the use-case, a render-props component
can be wrapped in a HOC allowing the provided functionality to be used in either
way.
