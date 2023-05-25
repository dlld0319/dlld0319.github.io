---
title: js 自己写油猴
date: 2023-05-25
categories:
- code js
excerpt: js 慢慢完成
---

```js
//jianshu
setInterval(o=>{
        document.getElementsByTagName('div')[document.getElementsByTagName('div').length-1].innerHTML='';
        document.getElementsByTagName('div')[document.getElementsByTagName('div').length-2].innerHTML='';
        document.getElementsByTagName('div')[document.getElementsByTagName('div').length-3].innerHTML='';
        document.getElementsByTagName('div')[document.getElementsByTagName('div').length-4].innerHTML='';
         document.getElementsByTagName('div')[document.getElementsByTagName('div').length-5].innerHTML='';
            document.getElementsByTagName('div')[document.getElementsByTagName('div').length-7].innerHTML='';
            document.getElementById('note').style='display:none';
            document.getElementsByTagName('iframe')[0].style='display:none';
        },8);
```