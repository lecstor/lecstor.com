---
title: Golang (gO) Cheatsheet
date: "2019-01-27T23:41:17Z"
---

# Install

```bash
$ brew update && brew install go
```

or download from [Golang Downloads](https://golang.org/dl/) and [install](https://golang.org/doc/install)

# Testing

`$ go test` - run tests

## Generate Tests

[gotests](https://github.com/cweill/gotests/) - Generate Go tests from your source code

`$ gotests -w -all ./client.go > client_test.go`

## Coverage

`$ go test -cover` - run tests and write coverage profile to `cover.out`

`$ go tool cover -html=cover.out` - view covered/not covered code in browser

`go tool cover -help` - for more

## Testing Resources

- [go-doc Testing](https://golang.org/doc/code.html#Testing)
- [go-cmd: Testing flags](https://golang.org/cmd/go/#hdr-Testing_flags)
- [go-cmd: Testing Functions](https://golang.org/cmd/go/#hdr-Testing_functions)
- [go-pkg: Package Testing](https://golang.org/pkg/testing/)
- [Golang Book - Intro - Testing](https://www.golang-book.com/books/intro/12)
- [Lesser-Known Features of Go Test](https://splice.com/blog/lesser-known-features-go-test/)

# Trouble-shooting

## Cache Clean

Cleaning the go caches once fixed some "unknown import path"/"cannot find module providing package" errors ([Package Clean](https://golang.org/pkg/cmd/go/internal/clean/))

`$ go clean -cache -modcache -i -r`

# Resources

- [golang.org/](https://golang.org/)
  - [Documentation](https://golang.org/doc/)
  - [Commands](https://golang.org/cmd/)
    - [go](https://golang.org/cmd/go/)
    - [doc](https://golang.org/cmd/doc/)
  - [Packages](https://golang.org/pkg/)
- [Golang Book](https://www.golang-book.com/)
  - [An Introduction to Programming in Go](https://www.golang-book.com/books/intro)
- [Golang Wiki](https://github.com/golang/go/wiki)
  - [Modules](https://github.com/golang/go/wiki/Modules)
    - [How to use modules](https://github.com/golang/go/wiki/Modules#how-to-use-modules)
  - [Working with Go](https://github.com/golang/go/wiki#working-with-go)
- [Go by Example](https://gobyexample.com/)
- [Awesome Go](https://github.com/avelino/awesome-go) - A curated list of awesome Go frameworks, libraries and software.
