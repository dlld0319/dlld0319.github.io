---
title: js 发送邮件
date: 2023-05-22 15:11:00
categories:
- 小技巧
excerpt: js node mailer 发送邮件
---
**如题**
```ts
options.from = '@126.com';
    const transporter = createTransport({
      port: 465,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
        user: '@126.com',
        pass: '' // QQ邮箱需要使用授权码
      },
      host: 'smtp.126.com'
    });
    transporter.sendMail(options, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(`Message: ${info.messageId}`);
      console.log(`sent: ${info.response}`);
    });

```