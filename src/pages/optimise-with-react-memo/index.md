---
title: Optimising with React.memo
date: "2019-03-21T10:31:13+10"
---

Takeaway: keep your memoed components focussed and their props shallow, and prefer simple solutions over complexity. skip to [the flip](#the-flip)

The first step to voiding unnessary renders is to use `PureComponent` (for class components) or `React.memo` (for function components). The second step is to ensure their props don't look like they've changed even when they haven't. ie `map`, `filter`, and many of their friends will return a new object every time, even if it's contents are the same. You might use them in your component, in Redux selectors, or elsewhere in your codebase and they'll trip up some of React & Redux's in-built optimisations if not handled correctly.

While working on an app that deals with schedules I hit an issue where my controlled input for the schedule name was slow as molasses because each change to an input triggered a render of components which took the schedule as a prop and did much date parsing and formatting for the schedule form and summary display.

**NP: I flip near the end of this post and replace this solution with a simple props change**

```js
import React, { memo } from "react";

const ScheduleEditor = memo(function ScheduleEditor({ schedule, onChange }) {
  return (...);
}

const ScheduleSummary = memo(function ScheduleSummary({ schedule }) {
  return (...);
}

function Schedule() {
  const [schedule, setSchedule] = useState(initSchedule);

  const updateSchedule = useCallback(
    props => setSchedule(schedule => ({ ...schedule, ...props })), []
  );

  const updateName = e => updateSchedule({ name: e.target.value });

  return (
    <>
      <input value={schedule.name} onChange={updateName} />
      <ScheduleSummary schedule={schedule} />
      <ScheduleEditor schedule={schedule} onChange={updateSchedule} />
    </>
  )
}
```

The editor and summary don't actually do anything with the schedule name so my first move was to give them a reduced schedule object, removing the `name` property and others.

```js
function getMinSchedule(schedule) {
  if (!schedule) {
    return;
  }
  const { end, recurring, rrule, start } = schedule;
  return { end, recurring, rrule, start };
}
...
  const minSchedule = getMinSchedule(schedule);
...
      <ScheduleSummary schedule={minSchedule} />
      <ScheduleEditor schedule={minSchedule} onChange={updateSchedule} />
```

Of course now I'm creating a new schedule object on each render so `memo` lets the component render every time, regardless of whether or not there have been any changes.

I've hit similar issues with Redux selectors before and the answer there is [Reselect](https://github.com/reduxjs/reselect) which provides memoisation for selectors. I'd also used [mem](https://github.com/sindresorhus/mem) in another part of the app so *naturally* I figured I'd just use that to cache the altered schedule objects and pass them to my components. 

I realised this clever little nugget would do what I wanted. It will hand back a cached object matching the object passed (after the first time) so memo will see the prop as not having changed.

```js
import mem from "mem";

const memProp = mem(obj => obj);
```

I used that and lodash.pick to replace my previous `getMinSchedule` function. (`pick` vs a custom func is definitely purely down to preference)

```js
import pick from "lodash.pick";

function getMinSchedule(schedule) {
  return memProp(pick(schedule, ["end", "recurring", "rrule", "start"]));
}
```

Now my input field was back to behaving properly and everything was good. I made a [codesandbox](https://codesandbox.io/s/0ylovpzy30) for a future write-up and grabbed a coffee before continuing.

## The flip

So now all those puzzle-solving pleasure chemicals in my brain had subsided I took another look at the solution. While I'd only added 4 lines to my code I had added a decent amount of complexity (and invisible processing) to solve a problem that can be solved with a change to how we handle our props.

Time to revisit the solution I considered initially but rejected based on the fact that I thought it was unpleasant..

```js
const ScheduleEditor = memo(function ScheduleEditor({ start, end, rrule, recurring, onChange }) {
  return (...);
}

const ScheduleSummary = memo(
  function ScheduleSummary({ start, end, rrule, recurring }) {
    return (...);
  }
);

function Schedule() {
...
  const minSchedule = pick(schedule, ["end", "recurring", "rrule", "start"]));
...
      <ScheduleSummary {...minSchedule} />
      <ScheduleEditor {...minSchedule} onChange={updateSchedule} />
...
}
```

Simpler solution, same result.

> Urgh! all those props mixed in together. What if I have a lot more object props? What if I have more "non-object" props? what a mess!

Well, no, not really. Worst case I could put all the extra props in an object or two and pass them in as `tools` or `flags` or whatever suits. But really it comes back to getting the component structure right. Small, focussed components shouldn't have so many props, tools, or flags that this would be a big issue and make render optimisations that much easier. And for deeper component trees we can use Redux, or now React Context, to avoid components having to pass through props they don't use.

*KISS*


