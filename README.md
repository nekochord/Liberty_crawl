# Liberty_crawl

簡介
===
利用nodejs的request和cheerio模組對自由時報進行簡易爬蟲
輸入指定的日期和類別後，會回傳新聞的json檔

使用方式
===
```
cmd:
>> node index.js [日期] [類別]
>> node index.js 20180417 focus
```
目前的支援類別:
focus, politics, society, local, life

回傳格式
===
資料會輸出至data資料夾
格式為json
```
元素{
    Title:新聞標題
    Category:類別
    Date:日期
    Author:記者資訊
    Location:地區資訊
    href:新聞連結網址
    Article:新聞全文
}
```
