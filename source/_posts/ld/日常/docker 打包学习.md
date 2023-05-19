---
title: Docker打包学习
date: 2023-05-19
categories:
- docker
excerpt: docker
---
**打包docker基本脚本**
- 首先需要选择基础镜像。一般选择这个 是体积最小的。
如果使用特殊技术就选择对应技术使用的也可以，
```
FROM alpine:latest

FROM node:14-alpine3.15
```

- 如果有需要可以设置时区，这个是独立项目需要的，比如我这只在本地跑一点代码

```
# 设置时区
RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata
```

之后基于使用的技术添加包
比如
python 需要 python3和pip
```
RUN apk add python3 py-pip
RUN pip3 install requests
RUN pip3 install schedule
```

- 最后运行当前启动指令

```
CMD [ "python", "jobs.py" ]
```

-----

这之下是通过github action 打包docker 脚本
可支持多种平台x86  arm 等
```
name: Build dockers

on:
  push:
    branches:
      - master
    tags:
      - '*'

  workflow_dispatch:

jobs:

  docker:
    name: Build dockers
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: docker/setup-qemu-action@v2
      - uses: docker/setup-buildx-action@v2
        with:
          install: true
          platforms: linux/amd64,linux/arm64/v8,linux/arm/v7

      - uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_TOKEN }}

      - name: build and push in master
        uses: docker/build-push-action@v4
        with:
          push: true
          tags: dlld0319/jobs:latest
          context: .
          platforms: linux/amd64,linux/arm64/v8,linux/arm/v7
```