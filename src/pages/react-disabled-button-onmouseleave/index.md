---
title: React does not fire onMouseLeave events on a disabled button
date: "2018-12-22T01:38:00.000Z"
---

Posting as this was decently difficult to diagnose while researching and testing 3rd party popover/tooltip components.

The button component I needed an `onHover` tooltip for is responsive via either `react-responsive` or plain old media queries.

The responsive options were wrapped in a `React.Fragment` so there were also issues with the tooltip components augmenting the first option even when the second was displayed (unconfirmed if this was only with plain media queries).

Swapping `React.Fragment` for a plain `div` changed the results, but did not solve the problem, making the issue more difficult to debug.

In the end I think the best solution will be to simply fake the disabled state of the button instead of actually disabling the html element.

[Demo on CodeSandbox](https://codesandbox.io/s/8xlw160jl9)

**References:**

- [Native button mouse eneter/leave](https://codesandbox.io/s/yqnx763509)
- [onMouseLeave strange behaver when has disabled child element](https://github.com/facebook/react/issues/10396)
- [onMouseLeave doesn't work if the node gets detached](https://github.com/facebook/react/issues/6807)
- [Consider removing mouseenter/mouseleave polyfill](https://github.com/facebook/react/issues/11972)

```
import React from "react";
import ReactDOM from "react-dom";

function log(who) {
  return () => console.log(who);
}

function App() {
  return (
    <div className="App">
      <h1>Hello Button</h1>
      <p>
        React will not fire onMouseLeave events for a disabled button (although
        it does fire onMouseEnter)
      </p>
      <p>Open the CodeSandbox console to see logging</p>
      <div style={{ margin: "3rem" }}>
        Works as intended{" "}
        <button onMouseEnter={log("enter")} onMouseLeave={log("leave")}>
          Button
        </button>
      </div>
      <div style={{ margin: "3rem" }}>
        No onMouseLeave{" "}
        <button
          disabled
          onMouseEnter={log("disabled enter")}
          onMouseLeave={log("disabled leave")}
        >
          Disabled Button
        </button>
      </div>
      <div style={{ margin: "3rem" }}>
        Events on parent div, works sometimes
        <div
          style={{ border: "1px solid blue" }}
          onMouseEnter={log("div enter")}
          onMouseLeave={log("div leave")}
        >
          <button disabled>Div'd Disabled Button</button>
        </div>
      </div>
      <div style={{ margin: "3rem" }}>
        Events on parent div with padding, works more often (dependant on mouse
        move speed)
        <div
          style={{ padding: "1px", border: "1px solid blue" }}
          onMouseEnter={log("div 2 enter")}
          onMouseLeave={log("div 2 leave")}
        >
          <button disabled>Div'd Disabled Button 2</button>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
