---
title: MongoDB Upgrade 2.4 to 2.6 in Debian
date: "2014-05-13T22:13:03.284Z"
---

When upgrading to the latest and greatest MongoDB (2.6) the first thing you have to do is run a check on your databases. Specifically the [upgrade docs](http://docs.mongodb.org/manual/release-notes/2.6-upgrade/) say:

> To begin the upgrade procedure, connect a 2.6 mongo shell to your MongoDB 2.4 mongos or mongod and run the db.upgradeCheckAllDBs() to check your data set for compatibility.

Tightly constrained by the box, I wondered how I could install a 2.6 mongo shell on my Debian system without upgrading the whole shebang.. turns out there's no need.. just download the tar version of MongoDB and run the shell straight from there..

```
$ curl -O http://downloads.mongodb.org/linux/mongodb-linux-x86_64-2.6.1.tgz
$ tar -zxvf mongodb-linux-x86_64-2.6.1.tgz
$ ./mongodb-linux-x86_64-2.6.1/bin/mongo
```

to run the check, you also need to be using the admin database, so..

```
> use admin
switched to db admin
> db.upgradeCheckAllDBs()

Checking database mydb1

Checking collection mydb1.coll1

Checking collection mydb1.coll2

Checking database mydb2

Checking collection mydb2.coll1

Checking collection mydb2.coll2

Everything is ready for the upgrade!
true
>
```
