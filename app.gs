function doPost(e) {
  // LINE Channel Token
  var CHANNEL_ACCESS_TOKEN = '*****';
  
  // 解析 User 端傳來的 JSON 檔案
  var msg= JSON.parse(e.postData.contents);

  // For Debugging
  Logger.log(msg);
  console.log(msg);

  // 抓取 User 回傳的 replyToken 與文字內容
  var replyToken = msg.events[0].replyToken;
  var userMessage = msg.events[0].message.text;

  if (typeof replyToken === 'undefined') {
    return;
  };

  /*
   * 宣告回傳訊息內容
   * 未來要改寫成 case 寫法
  */
 

  // If User 傳「問問題」
  if (userMessage == "問問題"){
    var reply_message=[{
  "type": "text",
  "text": "告訴我要搜尋的關鍵字！\n（ 空格用加號代替 ）",
      // 快速回覆按鈕（ 泡泡框 ）
  "quickReply": {
    "items": [
      {
        "type": "action", 
        "action": {
          "type": "message",
          "label": "iPhone 13",
          "text": "iPhone+13"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "特斯拉",
          "text": "特斯拉"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "NBA",
          "text":"NBA"
        }
        
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "聯絡我們",
          "text":"聯絡我們"
        }
        
      }
    ]
  }
}];
  }

  // If User 傳送「 開始 」（ 未來要綁定為 Follow event ）
  else if (userMessage == "開始"){
    reply_message = [
        {
  "type": "template",
  "altText": "This is a buttons template",
  "template": {
      "type": "buttons",
      "imageAspectRatio": "rectangle",
      "imageSize": "cover",
      "imageBackgroundColor": "#FFFFFF",
      "title": "機器人使用教學",
      "text": "點選下面按鈕，可以問 iPhone 問題、聯絡蘋果仁！",
      "defaultAction": {
          "type": "message",
          "label": "問問題",
          "text": '問問題'
      },
      "actions": [
          {
          "type": "message",
          "label": "問問題",
          "text": '問問題'
          },
          {
            "type": "message",
            "label": "聯絡我們",
            "text": '聯絡我們'
          },
          {
            "type": "uri",
            "label": "前往網站",
            "uri": 'https://applealmond.com/amp/'
          }
      ]
  }
}
    ]
  }



  else if (userMessage == "聯絡我們"){
    reply_message = [
        {
  "type": "template",
  "altText": "This is a buttons template",
  "template": {
      "type": "buttons",
      "thumbnailImageUrl": "https://i1.zi.org.tw/applealmond/2021/07/1625978742-99578d641ac3589d2c445b908aae80b8.jpg",
      "imageAspectRatio": "rectangle",
      "imageSize": "cover",
      "imageBackgroundColor": "#FFFFFF",
      "title": "Contact",
      "text": "商業合作 / 活動邀約，都歡迎透過 Email 與我們聯繫，我們會盡快回覆。\niPhone 問題請用搜尋功能",
      "defaultAction": {
          "type": "uri",
          "label": "Email 給蘋果仁",
          "uri": 'mailto:contact@applealmond.com'
      },
      "actions": [
          {
            "type": "uri",
            "label": "Email 給蘋果仁",
            "uri": 'mailto:contact@applealmond.com'
          },
          {
            "type": "message",
            "label": "我有 iPhone 問題",
            "text": '問問題'
          }
      ]
  }
}
    ]
  }
  
// 關鍵字爬文回傳訊息格式

  else{
    reply_message = [
        {
  "type": "template",
  "altText": "This is a buttons template",
  "template": {
      "type": "buttons",
      "thumbnailImageUrl": "https://i1.zi.org.tw/applealmond/2021/07/1625978742-99578d641ac3589d2c445b908aae80b8.jpg",
      "imageAspectRatio": "rectangle",
      "imageSize": "cover",
      "imageBackgroundColor": "#FFFFFF",
      "title": userMessage + "的搜尋結果",
      "text": "找到了！點選連結看相關文章>>",
      "defaultAction": {
          "type": "uri",
            "label": "看文章",
            "uri": 'https://applealmond.com/?s='+userMessage
      },
      "actions": [
          {
            "type": "uri",
            "label": "看文章",
            "uri": 'https://applealmond.com/?s='+userMessage
          }
      ]
  }
}
    ]
  }
  

  // 回傳 replyMessage 給 User 端
  var url = 'https://api.line.me/v2/bot/message/reply';
  UrlFetchApp.fetch(url, {
      'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': reply_message,
    }),
  });
}
