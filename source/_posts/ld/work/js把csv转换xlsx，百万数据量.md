---
title: js 转换 csv to xlsx
date: 2023-06-27
categories:
- 小技巧
excerpt: csv to xlsx
---
引用两个包
```shell
npm i yarn
yarn add node-xlsx
yarn add csv-parse
```

代码

```js
const fs = require("fs");
const { parse } = require("csv-parse");
const xlsx = require('node-xlsx');
inputUrl='./name.csv';
outputUrl='./name.xlsx';
maxNum=99999;
let rows = [];
let excelArr = []
function formatToExcel(id,row0,rowsAll){
    let writeRow=[Object.keys(row0)];
    rowsAll.forEach((ois)=>{
        const arr=[];
        for (const key in ois) {
            arr.push(ois[key]);
        }
        writeRow.push(arr);
    });
    excelArr.push({name:'sheet'+id,data:writeRow});
}

new Promise(async (resolve, reject) => {
    let ids=0;
    fs.createReadStream(inputUrl)
        .pipe(parse({ columns: true, relax_quotes: true, escape: '\"', ltrim: true, rtrim: true }))
        .on("data", function (row) {
            rows.push(row);
            if(rows.length>=maxNum){
                formatToExcel(ids,row,rows);
                rows=[];
                ids++;
                console.log('第'+ ids+'次 读取10w条数据');
            }
        })
        .on("end", function () {
            console.log("已全部读取");
            resolve('finished')
        })
        .on("error", function (error) {
            console.log(error.message);
            reject(error)
        });
}).then(o => {
    console.log('正在转换为excel，请稍后...\n 数据量越大时间越长');
    var buffer=xlsx.build(excelArr);
    console.log('正在输出excel，请稍后...\n 数据量越大时间越长');
    fs.writeFile(outputUrl,buffer,function(err){
        console.log('转换完成，导出时可能出现问题，请检查导出文件核对数据');
    })
    console.log('已完成，请检查导出文件核对数据');
}
).catch(o=>{
    console.log(o);
})

```