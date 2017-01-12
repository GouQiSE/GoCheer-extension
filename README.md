# GoCheer-extension
枸杞插件开发部分

##### _update by 张鸿羽  12.28 21:56_

### Chrome插件开发的文档

chrome官方正版指南（英文版） https://developer.chrome.com/extensions/getstarted  
中文版指南（这个好像更好看更官方） https://crxdoc-zh.appspot.com/extensions/getstarted  
chrome extension中文版指南（这个好像有些地方已经过时了，仅供参考） http://open.chrome.360.cn/extension_dev/overview.html  

-------------------------

### 各种翻译API

微软Bing翻译API：https://www.microsoft.com/en-us/translator/getstarted.aspx    
Google翻译API：https://cloud.google.com/translate/docs/    
有道翻译API：http://fanyi.youdao.com/openapi?path=data-mode    
目前已经申请了一个有道API  
API key: 1831162149  
keyfrom: GoCheer  
备胎：  
API key: 901688089  
keyfrom：GoCheerJava  

-------------------------

### 调试请求的工具

postman（一个Chrome应用（不是扩展）），可以用来调试一些请求，在Chrome应用商店搜索安装即可。  

-------------------------

### 现状

已经实现的有：    
在Chrome上浏览任意一个网页，划词或双击中文或英文单词均可可得到json文件结果（但是似乎点击的太鬼畜偶尔会出bug显示不出结果，刷新一下就好），并可以将结果解析，写到弹出的结果框内。    
屏幕右下角出现成就弹框。backgroud_script与content_script的通信。  
登录时才出现划词结果框，未登录时不出现。  
成就弹框滑入滑出、定时自动消失。  
basic&translation。给服务器发post得到成就信息。多个成就弹框同时出现。  
只有点击非结果框部分或“×”才使结果框消失。  
插件登录成功后自动跳转到用户信息及注销页。  
注销成功后自动跳转到登录页。    
结果框的样式设计（html+css）。  
成就框的样式设计（html+css）。  
