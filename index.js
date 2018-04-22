var request=require('request');
var cheerio=require('cheerio');
var fs=require('fs');
var libertyLIB=require('./libertyLIB');
var date=process.argv[2];
switch(process.argv[3]){
  case "focus":
    libertyLIB.focusDateNews(request,cheerio,fs,date,"focus");
    console.log("正在抓取"+date+"的焦點新聞...");
    break;
  case "politics":
    libertyLIB.focusDateNews(request,cheerio,fs,date,"politics");
    console.log("正在抓取"+date+"的政治新聞...");
    break;
  case "society":
    libertyLIB.focusDateNews(request,cheerio,fs,date,"society");
    console.log("正在抓取"+date+"的社會新聞...");
    break;
  case "local":
    libertyLIB.focusDateNews(request,cheerio,fs,date,"local");
    console.log("正在抓取"+date+"的地方新聞...");
    break;
  case "life":
    libertyLIB.focusDateNews(request,cheerio,fs,date,"life");
    console.log("正在抓取"+date+"的生活新聞...");
    break;
  default:
    console.log("錯誤的參數!");
}
