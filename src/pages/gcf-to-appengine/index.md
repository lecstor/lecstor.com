---
title: A Journey from Google Cloud Functions to Appengine Flex
date: "2019-02-26T10:28:25+10"
---

My goal was to deploy a basic React app with a server backend to the Google
Cloud Platform.

For learnings I decided to use Google Cloud Functions (which may also have been
the cheapest backend option).

TL;DR this is not what Google Cloud Functions are intended for..

### Deploy the static React app

The recommended option is to host this in Google Cloud Storage as Browser
storage which gives the added benefit of being able to use a CDN with a click
on a checkbox.

This was a fairly painless process involving creating the bucket named after my
domain name and creating a CNAME record pointing to it. Unfortunately this
doesn't provide SSL.

### Set up a load balancer

A bit more finding my way around, but not too bad using the great documentation
available. The load balancer allowed me to add my domain and automatically add
a Let's Encrypt SSL cert.

With only an HTTPS endpoint set up, HTTP requests were denied so I added an HTTP
endpoint. There's currently no way to have the load balancer redirect from HTTP
to HTTPS so I had to resort to adding a Javascript redirect snippet to my app
index.html to ensure HTTPS was always used.

The load balancer can be set up to forward to a bucket backend, or a service
backend, but not Google Cloud functions. I had the choice of adding a service
and setting up a proxy, or having my app to hit the cloud functions directly 8(.
I opted for the latter for the reduced cost and complexity.

### Move to Appengine Flexible

At this point I reassessed things.. I had had thoughts of using websockets for
live updates on database changes and realised that that was never going to work
with GCF. I could add a service behind the load balancer and use it for
websockets and at the same time solve the functions issue but then there didn't
seem to be enough benefit from maintaining the cloud functions as well as a
service so I opted to move everything to a service. Putting that service behind
the load balancer would then mean I would need to handle any scaling issues
myself.

Appengine standard would potentially mean the service dissappeared at times,
breaking the websockets implementation so I opted for flexible. I could start
with a single service and easily increase that if ever needed.

Unfortunately Appengine can't be set up to serve static content from GCS without
going through the service, so the service will be serving both static and dynamic
content and I lose the CDN. On the plus side it'll all be there if I ever decide
server-side rendering is the way to go..

### Summary

The Google Cloud Platform is very well documented, and there are many tutorials
available making it fairly easy to get things set up, as long as you follow the
prescribed paths.

I was surprised and disappointed by some of the limitations imposed such as the
lack of redirection from HTTP to HTTPS and the inability of the load balancers
to forward to cloud functions in one instance and cloud storage in the other.
The lack of HTTP/HTTPS redirection has an issue in the google bug tracker where
a fix was promised a few years ago.

Ultimately I think the UI and documentation provided by Google is a refreshing
change to that offered by AWS. It's still relatively young as a platform so it's
likely that things will continue to improve. Hopefully the limitations are not
concious decisions to push people to use the more vendor specific services such
as Firebase. Appengine itself has definitely come a long way since I last used
it 7 years ago.

