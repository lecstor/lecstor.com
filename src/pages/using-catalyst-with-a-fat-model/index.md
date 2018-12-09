---
title: Using Catalyst with a Fat Model
date: "2011-12-04T09:01:37.121Z"
---

Today I'm going to talk about using a fat model in Catalyst. When I started using Catalyst and eventually got my head around all the parts and where they all fit in, the slot for my "business logic" seemed to be in the Controllers and I think that's a common assumption.

The first thing that got my spidey sense tingling about this approach was when I realised I had multiple Actions with the same code. I'm very, very DRY so that bugged me a lot. Because I was in a Controller my first attempts at fixing this resulted in lots of forwarding between Actions both private and not.. this gets very messy, very quickly.

Ok, so why not regular methods in the Controllers which are called from your Actions? This is a better solution wherever possible but I must admit it makes me feel icky.. a Controller is a place for Actions and for clarity, modularity, etc, I prefer to keep everything else out..

To this end I looked to the model, the next (first?) obvious place to put these common methods. At this stage I was still trying to fit my code into Catalyst and made a couple of attempts at small Models for targeted functionality but then ran into issues from wanting access from one Model to another. At the same time I also discovered the issues involved in accessing Catalyst code from cron scripts and the like..

ok, finally, my current solution? the fat Model. Essentially it's your whole app wrapped up in it's own nice "little" module..

### My App

```
package My::App;
use Moose;

has 'config'    => ( isa => 'My::App::Config', is => 'ro', required => 1 );

has 'schema'    => ( isa => 'DBIx::Class::Schema', is => 'ro', required => 1 );

has 'template' => ( isa => 'Template', is => 'ro' );

has 'visitor' => ( isa => 'My::App::Visitor', is => 'ro' );

has 'products' => ( isa => 'My::App::Products', is => 'ro', lazy_build => 1 );

sub _build_products{
    My::App::Products->new({ schema => $_[0]->schema });
}
```

With this as an entry point I can easily write a script which uses this class to access the full functionality of my app. I've also skipped a lot of coercing and auto-building in this example which you can use to make things even simpler.

ok, but I thought we were talking about Models?

### My App Model

```
package My::Catalyst::Model::MyApp;
use Moose;
extends 'Catalyst::Model::Factory::PerRequest';

__PACKAGE__->config( class => 'My::App' );

# Instantiate the main app for each request.
sub prepare_arguments {
    my ($self, $c) = @_;

    my $args = $c->config->{'Model::MyApp'}{args};

    $args->{template} = $c->view('TT')->template;
    $args->{schema} = $c->model('DB')->schema;

    $c->session unless $c->sessionid;

    my $visitor = { session_id => $c->sessionid };
    $visitor->{user} = $c->user if $c->user_exists;

    $args->{visitor} = My::App::Visitor->new($visitor);

    return $args;
}

no Moose;
__PACKAGE__->meta->make_immutable();

1;
```

With this model in my Catalyst app I can now access my main app from wherever I need within the Catalyst system via \$c->model('MyApp'). I'm also reusing things that Catalyst makes simple like my database model and template object. I use the template object when creating system emails in my app and there's no reason to instantiate a new Template object each time, and I can set it up once and know the same instance will be used everywhere.

### My Controller

```
package My::Catalyst::Controller::Root;
use Moose;
use namespace::autoclean;

BEGIN { extends 'Catalyst::Controller' }

__PACKAGE__->config(namespace => '');

sub index : Local{
    my ( $self, $c ) = @_;

    my $app = $c->model('MyApp');

    $c->stash({
        template => 'index.tt',
        latest_products => $app->products->latest
    });
}
```

Now I can use Catalyst for all the wonderful things it makes so easy while keeping my main app nicely separated from it. Oh, and just quietly.. if the sky turned green and I needed to set up a quick Dancer or Mojolicious app I could do that quite easily too..

_update: well, look at that sky.. 8) for my latest project, [PDFUnicorn](https://pdfunicorn.com) I've chosen to go with [Mojolicious](http://mojolicio.us/) for it's non-blocking goodness. (interesting to note the similarities with the [Express](http://expressjs.com/) framework for [Node.js](http://nodejs.org/), the current darling of modern web dev)._
