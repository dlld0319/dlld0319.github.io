
const express = require('express');
const app = express();
const port = 443;    //端口号
const request = require('request');
 
//监听请求 *代表所有的请求路径。
//也可指定请求路径，如/text，则只能接收http://localhost:3000/text的请求
app.get('*', (req, res) => {
  //接收要转发的http地址
  let url = req.url.substr(1);
  if(url.startsWith('http')){
    const options = {
      url,
      method:"GET",
      //headers: req.headers    //如果需要设置请求头，就加上
    }
    request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        //拿到实际请求返回的响应头，根据具体需求来设置给原来的响应头
        let headers = response.headers;
        res.setHeader('content-type',headers['content-type']);
        res.send(body);
      } else {
        res.send(options);
      }
    });
  }
})
 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})