---
title: Something about Perl
date: "2012-01-17T09:06:00.000Z"
---

Perl is used extensively all over the world in production, doing the job, all the time. Modern Perl takes the solid base that is Perl5 an implements all the goodness of modern programming practices. Perl has been in intensive use for more than 10 years and there are many examples of it's use that are very out of date. When searching for Perl references on the 'net, please make sure you restrict your search to the last 12 months.. there has been extensive progress in recent times.

## TMTOWTDI - There's More Than One Way To Do It

This has it's detractors and is certainly open to abuse. Other languages have the opposite view and believe in The One True Way. Reasons for this mostly boil down to making things easier to get started, but the real world just isn't that simple. My problem with this is that my favourite answer as a developer to "Can we...?" is "Yes. We can do anything". And with Perl I have never been proven wrong.

## Web Frameworks

### [Catalyst](http://www.catalystframework.org/)

The elegant MVC framework. Catalyst will make web development something you had never expected it to be: Fun, rewarding and quick.

### [Dancer](http://perldancer.org/)

PerlDancer is a micro perl web framework designed to be as effortless as possible for the developer. With PerlDancer, web development is fun again. It's a very expressive DSL for writing web applications with tons of plugins and a very dynamic community.

### [Mojolicious](http://mojolicio.us/)

Powerful out of the box with RESTful routes, plugins, Perl-ish templates, session management, signed cookies, testing framework, static file server, I18N, first class unicode support and much more for you to discover.

## Templates

### [Template Toolkit](http://template-toolkit.org/)

The Template Toolkit is a fast, flexible and highly extensible template processing system. It is Free (in both senses: free beer and free speech), Open Source software and runs on virtually every modern operating system known to man. It is mature, reliable and well documented, and is used to generate content for countless web sites ranging from the very small to the very large.

## Web Server Interface

### [PSGI/Plack](http://plackperl.org/)

PSGI is an interface between Perl web applications and web servers, and Plack is a Perl module and toolkit that contains PSGI middleware, helpers and adapters to web servers.

## Object Systems

Perl isn't OO.. Perl is ugly.. You have to bless hashes to make objects.. blah.. blah.. blah.. That's old school Perl. It's still there if you need it, so you can still run those legacy scripts with the latest Perl5, but you don't have to. We have Moose! It's Modern Perl, dude, it's a brave new world.

### [Moose](http://moose.iinteractive.com/)

Moose is a postmodern object system for Perl 5 that takes the tedium out of writing object-oriented Perl. It borrows all the best features from Perl 6, CLOS (Lisp), Smalltalk, Java, BETA, OCaml, Ruby and more, while still keeping true to its Perl 5 roots.

### [Mouse](http://search.cpan.org/~gfuji/Mouse-0.97/lib/Mouse.pm)

Moose is a postmodern object system for Perl5. Moose is wonderful. Unfortunately, Moose has a compile-time penalty. Though significant progress has been made over the years, the compile time penalty is a non-starter for some very specific applications. If you are writing a command-line application or CGI script where startup time is essential, you may not be able to use Moose (we recommend that you instead use persistent Perl executing environments like FastCGI for the latter, if possible). Mouse is a Moose compatible object system, which aims to alleviate this penalty by providing a subset of Moose's functionality.

## IOC Framework

### [Bread::Board](http://search.cpan.org/dist/Bread-Board/lib/Bread/Board.pm)

Bread::Board is an inversion of control framework with a focus on dependency injection and lifecycle management. It's goal is to help you write more decoupled objects and components by removing the need for you to manually wire those objects/components together.

## Database Interfaces

### [DBIx::Class](http://www.dbix-class.org/)

DBIC is an extensible and flexible Object/Relational Mapper written in Perl. ORMs speed development, abstract data and make it portable, allow you to represent your business rules through OO code and generate boilerplate code for CRUD operations.

## Database Deployment

### [DBIx::Class::DeploymentHandler](http://search.cpan.org/~frew/DBIx-Class-DeploymentHandler-0.001005/lib/DBIx/Class/DeploymentHandler.pm)

DBIx::Class::DeploymentHandler is, as its name suggests, a tool for deploying and upgrading databases with DBIx::Class. It is designed to be much more flexible than DBIx::Class::Schema::Versioned, hence the use of Moose and lots of roles.

### [DBIx::Class::Migration](https://github.com/jjn1056/DBIx-Class-Migration)

DBIx::Class::Migration defines some logic which combines both DBIx::Class::DeploymentHandler and DBIx::Class::Fixtures, along with a standard tutorial, to give you a simple and straightforward approach to solving the problem of how to best create database versions, migrations and testing data. It offers code and advice based on my experience of using DBIx::Class for several years, which hopefully can help you bootstrap out of the void.
