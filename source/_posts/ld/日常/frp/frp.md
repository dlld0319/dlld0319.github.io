---
title: frp内网穿透设置
date: 2023-05-22 15:17:00
categories:
- 小技巧
excerpt: frps frpc
---

frps.ini
```shell
[common]
bind_port = 7000
token = 12345678
```
启动 
```shell
frps -c frps.ini
```

frpc.ini
```shell
[common]
server_addr = ip
server_port = 7000
token = 12345678

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 3389
remote_port = 7005

# 多端口穿透
[range:FTP]
type = tcp
local_port = 21,50000-50010
remote_port = 2121,10000-10010
local_ip = 127.0.0.1

# http穿透
[web1]
type = http
local_port = 8080
custom_domains = xxx.xxx.xxx.xxx # 服务器ip
locations = / # eg：http://xxx.xxx.xxx.xxx/yolo/test
```

客户端启动
```shell
frpc -c frps.ini
```


linux可以持久后台运行
```
nohup ./frpc -c frpc.ini >/dev/null 2>&1 &
nohup ./frps -c frps.ini >/dev/null 2>&1 &
```
---------
下载地址


**[https://github.com/fatedier/frp/releases](https://github.com/fatedier/frp/releases)**