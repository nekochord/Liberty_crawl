var news_array=[];
var errorcount=0;
function focusDateNews(request,cheerio,fs,date,category){
  //第一次request抓取指定天數的新聞urls
  request({
    url:"http://news.ltn.com.tw/list/newspaper/"+category+"/"+date,
    method:"GET"
  },function(e,r,b){
    if(e || !b){
       console.log("ERROR:"+date);
    }else{
      $=cheerio.load(b);
      var results=$("a.ph");
      var url_list=[];
      for(i=0; i<results.length; i++){
        var ref=$(results[i]).attr("href");
        var reg=/P:[0-9]*:(.*)/i;
        var title=$(results[i]).attr("data-desc").match(reg)[1];
        url_list.push({
          href:"http://news.ltn.com.tw/"+ref,
          Title:title,
          Category:category
        });
      }
      recur2(fs,request,cheerio,date,url_list,0);
    }
  });
}
function recur2(fs,request,cheerio,date,url_list,count){
  if(url_list.length==count){
    //中止條件
    console.log("success!!");
    console.log("總錯誤數:"+errorcount);
    fs.writeFileSync("./data/"+date+"_"+url_list[0].Category+".json", JSON.stringify(news_array));
  }else{
    //遞迴部分
    sleep(1000);
    request({
      url:url_list[count].href,
      method:"GET"
    },function(e,r,b){
      if(e || !b){
        console.log(url_list[count].href);
        errorcount++;
      }else{
        $=cheerio.load(b);
        var article=$("div.text p").text();
        try{
          var result={
            Title:url_list[count].Title,
            Category:url_list[count].Category,
            Date:date,
            Author:article.match(/〔(.*)／/i)[1],
            Location:article.match(/／(.*)〕/i)[1],
            href:"http://news.ltn.com.tw/"+url_list[count].href,
            Article:article
          };
          news_array.push(result);
          console.log(result.Title+"  抓取成功!");
        }catch(err){
          errorcount++;
          console.log("匹配錯誤");
        }
      }
      recur2(fs,request,cheerio,date,url_list,count+1);
    });

  }
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
//Export functions
exports.focusDateNews=focusDateNews;
