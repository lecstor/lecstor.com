---
title: Go - clear cache
date: "2019-01-26T03:19:27Z"
---

When trying to run `go install` or `go test` I was getting errors such as:

```
imports github.com/stretchr/testify/mock: unknown import path "github.com/stretchr/testify/mock": cannot find module providing package github.com/stretchr/testify/mock
```

I boiled it down to something wrong in my `go` setup as I was unable to replicate the errors on a second machine.

Uninstalling and reinstalling `go` did not help.

Running `go clean` produced similar errors, or just didn't fix the issue.

In the end though, the magic spell turned out to be:

```bash
$ go clean -cache -modcache -i -r
```

Maybe it'll help you too.
