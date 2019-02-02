---
title: Testing Code
date: "2018-03-10T00:00:00.000Z"
---

Some thoughts on testing - the what and the how (javascript).

# Testing

The primary reason for writing automated tests is to ensure that your code runs
correctly. When you make changes to your code, tests should tell you when you
break things. Tests can also be used as usage examples for others.

Having 100% code coverage is nice, but is no guarentee that your code does what
it's meant to. Code coverage rarely equates to functional use coverage.

## Services

Ensure that your tests can get an instance of the server without actually
starting the server. Ensure that the instance has all routes, plugins, etc
initialised, or that tests can easily initialise the parts they need. The
latter is simpler and more reliable, and in most cases to be preferred.

Keeping I/O as close to the routes/handlers as possible allows for the business
logic to be contained in functional functions/methods/classes which are more
easily testable.

### Recommendations for writing services:

- use Node >= 8 for async/await goodness
- don't use Babel, it'll only complicate things
- user `require` and `module.exports`
- `exports` is a reference to `module.exports`, if you set it to another value
  what you set it to won't be exported

## Functional Testing

Test actual use-cases. This means writing tests for your endpoints in a service
or public methods in a module. You shouldn't be looking at code coverage for
these tests, just coverage of the functionality the service or module should
provide. Name your tests for the use case they exercise. Test the happy paths
and error paths including validation and I/O errors.

Mocking for these tests should not be done on the functions internal to the
module or service you are testing. Mock I/O only, such as requests to other
services, and database or disk I/O. Avoid nocking where possible, and rather
mock the clients your code uses to perform I/O operations. Nocking generally
involves too much knowledge of how the other things work internally while
clients are generally much simpler and their existing methods and API are
less likely to change.

## Unit Tests

Once you have good functional coverage you can look at your code coverage to
see where the holes in your testing are. Keep in mind, if you have good
functional coverage and blocks of code such as whole functions or modules
still don't have coverage, you may not actually need that code at all, or
maybe you need some more functional tests.

For complex functions, possibly with arguments that can vary substantially
you can write unit tests. Ideally complex logic will be broken out into
functions that have no I/O and simply take arguments and return a result.
This makes writing numerous test much simpler. If a function does I/O,
including calling other functions, try to ensure it is tested by your
functional tests so you're not having to implement loads of mocking.

## Javascript

Use [Jest](https://facebook.github.io/jest/docs/en/api.html). If you really have to, then Mocha and Sinon seem to be the way to go.
But Jest will make writing and running your tests simpler and more enjoyable. 8)

### Mocking

Jest allows your tests to mock modules and functions used by your code even when
that code does not allow you to inject your mocks. Functions mocked with Jest all
get a `mock` property which records all calls made to them so you can test that
your code is calling them correctly.

[.mock property](https://facebook.github.io/jest/docs/en/mock-functions.html#mock-property)

```javascript
const mockGetOrg = jest.fn(() => {
  return Promise.resolve({
    id: "role_e8355627893b4a9c8a5a955d1d56cad5",
    members: [
      "user_ab6a42ea4b2c404989fb6638e2675599",
      "user_ab6a42ea4b2c404989fb6638e2675000",
    ],
  });
});
jest.mock("@safetyculture/soter-client", () => {
  return jest.fn().mockImplementation(() => {
    return { getOrg: mockGetOrg };
  });
});

test("it calls soter-client getOrg correctly", async () => {
  await myFunction({ userId: "user_1234" });
  const firstCall = mockGetOrg.mock.calls[0];
  const [firstArg, secondArg] = firstCall;
  expect(firstArg).toEqual("user_1234");
  expect(secondArg).toBeInstanceOf(Function);
});
```

[Mock Functions](https://facebook.github.io/jest/docs/en/mock-functions.html)

### Nocking

- set test log level to error, it's a bit noisy, but without it route tests give you no clue as to what's gone wrong
- capture nock scope and call done when it's expected to be done for more useful test failures
- modify afterEach nock expect to give more info otherwise and clear pending nocks so all following tests don't break

afterEach test:

- expect there to be no pending mocks. The exception from this will tell you
  exactly which of the requests you were nocking did not fire.
- isDone will ensure that nock believes it is done
- cleanAll will make sure there are no remaining nocks for the next test

```javascript
afterEach () => {
  expect(nock.pendingMocks()).to.be.empty
  nock.isDone()
  nock.cleanAll()
}
```

In tests, call `isDone` on each nock scope before checking the result. If you
check the result first, and the nock scope after, then a failing test will
prevent the scope check from running and you don't get told that the request
didn't fire.

```javascript
test("something that makes a request", async () => {
  const myNock = nock("http://localhost:1234")
    .get("/")
    .reply(200);
  const result = await getHome();
  myNock.isDone();
  expect(resp.statusCode).toEqual(200);
});
```

### Running tests with Jest

In your package.json set the test script to `jest`

```json
{
  "scripts": { "test": "jest" }
}
```

```bash
npm test
```

Jest enables you to run individual scripts by file or test name matches.

```bash
yarn test __tests__/my-test.js
npm test __tests__/my-test.js

yarn test --testRegex __tests__\/my-.*\.js
npm test -- --testRegex __tests__\/my-.*\.js

yarn test -t "tests the .*"
npm test -- -t "tests the .*"
```

Jest has in-built coverage functionality

```bash
yarn test --coverage
```

Jest will also watch while you modify your code

```bash
yarn test --coverage --watch
yarn test -t "tests the .*" --watch
```
