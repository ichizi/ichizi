function urlconvert(){
  var oldurl=$("#oldurl").attr("value");
  oldurl=trimString(oldurl);
  if (oldurl=='')
  {
	  alert("\u8bf7\u8f93\u5165\u8981\u8f6c\u6362\u7684\u5730\u5740\uff0c\u53ef\u4ee5\u662f\u005b\u8fc5\u96f7\u002c\u5feb\u8f66\u002c\u0071\u0071\u65cb\u98ce\u002c\u0072\u0061\u0079\u0066\u0069\u006c\u0065\u002f\u0066\u0073\u0032\u0079\u006f\u0075\u98de\u901f\u7f51\u76d8\u002c\u0068\u0074\u0074\u0070\u002f\u0066\u0074\u0070\u005d\u4efb\u4f55\u4e00\u79cd\u7684\u6b63\u89c4\u4e0b\u8f7d\u5730\u5740\u0021");
	  return false;
  }
  if (oldurl.indexOf("thunder://")!=-1||oldurl.indexOf("Thunder://")!=-1||oldurl.indexOf("THUNDER://")!=-1){
      newurl=Thunderdecode(oldurl);
  }else if(oldurl.indexOf("Flashget://")!=-1||oldurl.indexOf("flashget://")!=-1||oldurl.indexOf("FLASHGET://")!=-1){
      newurl=Flashgetdecode(oldurl);
  }else if(oldurl.indexOf("qqdl://")!=-1||oldurl.indexOf("Qqdl://")!=-1||oldurl.indexOf("QQDL://")!=-1){
      newurl=qqdecode(oldurl);
  }else if(oldurl.indexOf("fs2you://")!=-1||oldurl.indexOf("Fs2you://")!=-1||oldurl.indexOf("FS2YOU://")!=-1){
      newurl=FS2Decode(oldurl);
  }else{
	   newurl=oldurl;
	   alert("\u8fd9\u4e2a\u5730\u5740\u8c8c\u4f3c\u4e0d\u662f\u005b\u8fc5\u96f7\u002c\u5feb\u8f66\u002c\u65cb\u98ce\u002c\u0072\u0061\u0079\u0066\u0069\u006c\u0065\u002f\u0066\u0073\u0032\u0079\u006f\u0075\u002c\u0068\u0074\u0074\u0070\u002f\u0066\u0074\u0070\u005d\u4efb\u4f55\u4e00\u79cd\u7684\u6b63\u89c4\u4e0b\u8f7d\u5730\u5740\uff0c\u8bf7\u6838\u5bf9\u5730\u5740\u540e\u518d\u8f6c\u6362\u0021");
	   return false;
  }
  thunderurl=ThunderEncode(newurl);
  flashgeturl=flashetencode(newurl);
  qqurl=qqencode(newurl);
  $("#oldurl").attr("value",oldurl);
  $("#newurl").attr("value",newurl);
  $("#thunderurl").attr("value",thunderurl);
  $("#flashgeturl").attr("value",flashgeturl);
  $("#qqurl").attr("value",qqurl);

  $("#down_newurl").html("&nbsp;&nbsp;&nbsp;<a target=_blank href='"+newurl+"'>\u666e\u901a\u4e0b\u8f7d</a>");
  $("#down_thunderurl").html("&nbsp;&nbsp;&nbsp;<a href='javascript://' thunderHref='"+thunderurl+"' thunderPid='134459' thunderType='' thunderResTitle='' onClick='return OnDownloadClick_Simple(this,2,4)' oncontextmenu='ThunderNetwork_SetHref(this)' >\u542f\u52a8\u8fc5\u96f7\u4e0b\u8f7d</a>");
  $("#down_flashgeturl").html("&nbsp;&nbsp;&nbsp;<a href='javascript://' onclick='ConvertURL2FG(\""+flashgeturl+"\",\""+newurl+"\",1926)'>\u542f\u52a8\u5feb\u8f66\u4e0b\u8f7d</a>");
  $("#down_qqurl").html("&nbsp;&nbsp;&nbsp;<a href='"+qqurl+"' target=_blank>\u542f\u52a8\u65cb\u98ce\u4e0b\u8f7d</a>");
   
}

function ConvertURL2FG(url,fUrl,uid)
	{	
		try{
			FlashgetDown(url,uid);
		}catch(e){location.href = fUrl;}
}

function Flashget_SetHref(obj,uid){obj.href = obj.fg;}

function   trimString(str)   
  {   
  var   re;   
  var   newstr;   
  re   =   new   RegExp("^(\\s)*");   
  re2   =   new   RegExp("(\\s)*$");   
  newstr   =   str.replace(re,"");   
  newstr   =   newstr.replace(re2,"");   
    
  return   newstr;   
}   
function qqencode(url){
   url='qqdl://'+encode64(url);
   return url;
}
function flashetencode(url){
   url='Flashget://'+encode64('[FLASHGET]'+url+'[FLASHGET]')+'&1926';
   return url;
}

function Thunderdecode(url) {
	 url=url.replace('thunder://','');
	 url=url.replace('Thunder://','');
	 url=url.replace('THUNDER://','');
     thunderUrl=decode64(url);
	 thunderUrl=thunderUrl.substr(2,thunderUrl.length-4);
	 return thunderUrl;
}

function Flashgetdecode(url){
    url=url.replace('Flashget://','');
    url=url.replace('flashget://','');
    url=url.replace('FLASHGET://','');
	if (url.indexOf('&')!=-1)
	{
		url=url.substr(0,url.indexOf('&'));	 
	}
	url=decode64(url);
	//flashgeturl=url.replace('[FLASHGET]','');
	//flashgeturl=flashgeturl.replace('[FLASHGET]','');
	flashgeturl=url.replace(/\[FLASHGET]/g,''); 
	return flashgeturl;
}

function  qqdecode(url){
	url=url.replace('qqdl://','');
	url=url.replace('Qqdl://','');
	url=url.replace('QQDL://','');
    qqurl=decode64(url);
    return qqurl;
}

function  FS2Decode(url){
    url=url.replace('fs2you://','');
    url=url.replace('Fs2you://','');
    url=url.replace('FS2YOU://','');
    fs2url=decode64(url).split("|")[0];
    fs2url="http://"+fs2url;
    return fs2url;
}