---
title: Code Splitting and Tree Shaking Webpack Gotchya
date: "2019-08-18T22:58:56+10"
---

*TL;DR* if you're building an SPA and plan to use Code Splitting you should
ignore tree shaking and structure your modules and imports accordingly to
avoid redundant code being included in your bundles. Make your imports as
explicit as possible, avoiding the use of barrel (index) files which simply
re-export code from multiple sub-modules.

[Webpack Tree Shaking](https://webpack.js.org/guides/tree-shaking/) - Tree shaking is a term commonly used in the JavaScript context for dead-code elimination. 

[Webpack Code Splitting](https://webpack.js.org/guides/code-splitting/) - Code splitting splits your code into various bundles which can then be loaded on demand or in parallel.

## Our components and module

Let's say we have a module, `barbazfoo`, which exports three functions; `foo`,
`bar`, `baz`.

*barbazfoo/index.js*
```
export { bar } from "./bar";
export { baz } from "./baz";
export { foo } from "./foo";
```

*barbazfoo/bar.js*
```
export const bar = () => "bar";
```

*barbazfoo/baz.js*
```
export const baz = () => "baz";
```

*barbazfoo/foo.js*
```
export const foo = () => "foo";
```

Our app has three pages, each importing a single function from our module.

Page1 imports `foo` from `barbazfoo`.

Page2 imports `bar` from `barbazfoo`.

Page3 imports `foo` from `barbazfoo/foo`. **!!**

`baz` is not used in our app.

**page1.js**
```
import { foo } from "./barbazfoo";

const Page1 = () => <h1>Page1 {foo()}</h1>;

export default Page1;
```

**page2.js**
```
import { bar } from "./barbazfoo";

const Page2 = () => <h1>Page2 {bar()}</h1>;

export default Page2;
```

**page3.js**
```
import { foo } from "./barbazfoo/foo";

const Page3 = () => <h1>Page3 {foo()}</h1>;

export default Page3;
```

## Standard app
```
import Page1 from './page1'));
import Page2 from './page2'));
import Page3 from './page3'));

const App = () => (
  <Router>
    <Route path="/page1" component={Page1} />
    <Route path="/page2" component={Page2} />
    <Route path="/page3" component={Page3} />
  </Router>
);

export default App;
```

With a standard configuration Webpack will bundle our app, pages, and module
into a single bundle.

```
dist/
└── [153K]  main.bundle.js
```

Tree shaking will do the right thing and drop `baz` from `barbazfoo` as it is
not used anywhere in the app.

In actual fact, for our simple test app the functions are evaluated and only
the results are used..

```
var ue=function(){return o.a.createElement("h1",null,"Home")},
  ce=function(){return o.a.createElement("h1",null,"Page1 ","foo")},
  se=function(){return o.a.createElement("h1",null,"Page2 ","bar")},
  fe=function(){return o.a.createElement("h1",null,"Page3 ","foo")};
```

## App using code splitting

Alternatively, we use dynamic imports in our routes to enable webpack to split
our bundle by route..

```
import loadable from '@loadable/component';

const Page1 = loadable(() => import('./page1'));
const Page2 = loadable(() => import('./page2'));
const Page3 = loadable(() => import('./page3'));

...

export default App;
```

Now webpack will split our app bundle into four bundles..

```
dist/
├── [161K]  main.bundle.js
├── [ 441]  pages-page1.bundle.js
├── [ 441]  pages-page2.bundle.js
└── [ 304]  pages-page3.bundle.js
```

Tree shaking will still do the right thing and drop `baz` from `barbazfoo`, but
there's a catch..

**The bundles for `page1` and `page2` which imported from the `barbazfoo` index
file will incude both the `foo` and `bar` functions, even though they only use
one or the other.**

However, the bundle for `page3` which imported from `barbazfoo/foo` directly,
will only include the `foo` function.

*pages-page1.bundle.js*
```js
(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    19: function(n, t, r) {
      "use strict";
      r.r(t);
      var u = r(0), e = r.n(u), c = r(33);
      t.default = function() {
        return e.a.createElement("h1", null, "Page1 ", Object(c.b)());
      };
    },
    32: function(n, t, r) {
      "use strict";
      r.d(t, "a", function() { return u; });
      var u = function() { return "foo"; };
    },
    33: function(n, t, r) {
      "use strict";
      var u = function() { return "bar"; },
        e = r(32);
      r.d(t, "a", function() { return u; }),
      r.d(t, "b", function() { return e.a; });
    },
  },
]);
```

*pages-page2.bundle.js*
```js
(window.webpackJsonp = window.webpackJsonp || []).push([
  [2],
  {
    20: function(n, t, r) {
      "use strict";
      r.r(t);
      var u = r(0), e = r.n(u), c = r(33);
      t.default = function() {
        return e.a.createElement("h1", null, "Page2 ", Object(c.a)());
      };
    },
    32: function(n, t, r) {
      "use strict";
      r.d(t, "a", function() { return u; });
      var u = function() { return "foo"; };
    },
    33: function(n, t, r) {
      "use strict";
      var u = function() { return "bar"; },
        e = r(32);
      r.d(t, "a", function() { return u; }),
      r.d(t, "b", function() { return e.a; });
    },
  },
]);
```

*pages-page3.bundle.js*
```js
(window.webpackJsonp = window.webpackJsonp || []).push([
  [3],
  {
    21: function(n, t, e) {
      "use strict";
      e.r(t);
      var u = e(0), r = e.n(u), c = e(32);
      t.default = function() {
        return r.a.createElement("h1", null, "Page3 ", Object(c.a)());
      };
    },
    32: function(n, t, e) {
      "use strict";
      e.d(t, "a", function() { return u; });
      var u = function() { return "foo"; };
    },
  },
]);
```


