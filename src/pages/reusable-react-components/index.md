---
title: Reusable React Components [WIP]
date: "2018-12-09T11:42:00.000Z"
---

To make you components as reusable as possible you should keep them small and
focussed. Much like functions, the single responsibility principle is a good
one to follow.

Enabling styling and child components to be as customisable as possible will
help you to avoid the need to repeat styling and logic over and over in all the
different components you'll need.

Achieving these goals will help you maintain consistency in the visual style of
your components and help to keep the total size of your app down.

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
can be wrapped in a HOD allowing the profided functionality to be used in either
way.
