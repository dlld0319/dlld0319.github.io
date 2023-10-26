---
title: python requests 增加header
date: 2023-05-19
categories:
- code python
excerpt: python requests 增加header
---
**python requests 增加header**

```python

import requests
import json
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
    "Cookie": "MUSIC_A_T=1569983286727; "
}
# https://music.163.com/#/my/m/music/playlist?id=3010181459
x = requests.get('https://music.163.com/#/playlist?id=3010181459',headers=headers)
print(x.text);

```