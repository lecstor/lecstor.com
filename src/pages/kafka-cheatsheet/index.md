---
title: Kafka/Protobuf Cheatsheet
date: "2019-01-30T01:47:54Z"
---

Tools for working with Kafka and Protobufs - all about dumping messages to the
console at this point.

# Kafkacat

https://medium.com/@coderunner/debugging-with-kafkacat-df7851d21968

## Install

```bash
$ brew install kafkacat --with-yajl
```

## list topics

```bash
$ kafkacat -L -b localhost:9092
```

## publish

```bash
$ kafkacat -P -b localhost:9092 -t awesome-topic
...type or paste message...
```

## consume

### print everything

```bash
$ kafkacat -C -b localhost:9092 -t awesome-topic
```

### print only messages

```bash
$ kafkacat -C -b localhost:9092 -t awesome-topic -p
```

# Protoc

http://google.github.io/proto-lens/installing-protoc.html

## Install

```bash
$ brew install protobuf
```

# KafkaCat & Protoc

https://github.com/edenhill/kafkacat/issues/72

The solution in the above issue didn't quite work for me, I needed to add the `-e`
option to get kafkacat to exit before protoc would dump the messages.

This means that you don't get the desired tail/follow functionality but it's still
usable enough with a little extra effort to set the offset.

## decode any Type of protobuf message and dump raw values

```bash
$ kafkacat -C -b localhost:9092 -t awesome-topic -o beginning -D "" -e | protoc --decode_raw
% Reached end of topic awesome-topic [0] at offset 201: exiting
...messages...
$ kafkacat -C -b localhost:9092 -t awesome-topic -o 201 -D "" -e | protoc --decode_raw
% Reached end of topic awesome-topic [0] at offset 321: exiting
...new messages...
```

## decode specifc Types of protobuf messages and dump pretty values

(bugga, it only dumps the last mesage..)

```bash
$ kafkacat -C -b localhost -t awesome-topic -D "" -e | protoc --decode=my.message.Type \
--proto_path=./path/to/proto/files My.proto
```
