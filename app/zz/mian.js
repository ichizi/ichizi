var sponsorList = [
	{ "qq": 569003405, "nick": "可爱鼠🤓", "money": 20, "type": 0, "time": 1585892204 },
	{ "qq": 757072699, "nick": "Maple", "money": 50, "type": 2, "time": 1585546604 },
	{ "qq": 596750059, "nick": "总有刁民想日朕", "money": 25, "type": 0, "time": 1585633004 },
	{ "qq": 1021742326, "nick": "§孖仔", "money": 30, "type": 0, "time": 1582523664 },
	{ "qq": 53401899, "nick": "青岛mg", "money": 20, "type": 0, "time": 1555061465 },
	{ "qq": 83249207, "nick": "云霄", "money": 6.6, "type": 2, "time": 1516634337 },
	{ "qq": 702052617, "nick": "月牙泉", "money": 66, "type": 2, "time": 1476958920 },
	{ "qq": 459588084, "nick": "洋葱", "money": 6.6, "type": 0, "time": 1487313346 }
]

window.onload = function () {
	getQrcode();
	for (var i = 0; i < sponsorList.length; i++) {
		insert(sponsorList[i].qq, sponsorList[i].nick, sponsorList[i].money, sponsorList[i].type, sponsorList[i].time);
	}
	formatting();
}

function getQrcode() {
	var alipay = document.getElementById("code-alipay");
	var wechat = document.getElementById("code-wechat");
	var qq = document.getElementById("code-qq");
	if (navigator.userAgent.match(/Alipay/i)) {
		/* 支付宝 */
		wechat.style.display = "none";
		qq.style.display = "none";
	} else if (navigator.userAgent.match(/MicroMessenger\//i)) {
		/* 微信 */
		alipay.style.display = "none";
		qq.style.display = "none";
	} else if (navigator.userAgent.match(/QQ\//i)) {
		/* QQ */
		alipay.style.display = "none";
		wechat.style.display = "none";
	}
}

function formatting() {

	var parm_a = document.getElementsByClassName("item_li_div");
	var parm_b = document.getElementsByClassName("item_li_title_div");
	for (var i = 0; i < parm_a.length; i++) {
		var sum = parseInt(parm_b[i].offsetHeight) + 20
		if (sum > 132) {
			parm_a[i].style.height = sum + "px";
		}
	}

	return;
}

function insert(qq, nick, money, type, time) {

	var insertText = '<li class="item_li">'
		+ '<div class="item_li_div">'
		+ '<div class="item_li_image_div">'
		+ '<img class="item_li_image" src="' + getAvatar(qq) + '" draggable="false">'
		+ '</div>'
		+ '<div class="item_li_title_div">'
		+ '<h5 class="item_li_title_big">' + getMoney(money) + '</h5>'
		// + '<p class="item_li_title_small">' + getQQ(qq) + '</p>'
		+ '<p class="item_li_title_small">' + nick + '</p>'
		+ '<p class="item_li_title_small">' + getMethod(type) + '</p>'
		+ '<p class="item_li_title_small">' + getTime(time) + '</p>'
		+ '</div>'
		+ '</div>'
		+ '</li>';

	parm = document.getElementById("card");
	parm.innerHTML = parm.innerHTML + insertText;
	return;
}


function getAvatar(qq) {
	return 'http://q1.qlogo.cn/g?b=qq&nk=' + qq + '&s=100';
}
function getNick(qq) {
	// return 'http://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=' + qq;
	// var xmlhttp = new XMLHttpRequest();
	// xmlhttp.open("GET", "http://api.33m.me/qq?lx=nc1&qq=" + qq, false);//方法，接口，异步
	// xmlhttp.send();//发送请求
	// xmlhttp.onreadystatechange = function () {
	// 	if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
	// 		var result = JSON.parse(xmlhttp.response);
	// 		console.log(result)
	// 		return result
	// 	}
	// }

}

function getMoney(money) {
	return '捐助' + '<span>' + money + '</span>' + '元';
}

function getQQ(qq) {
	return 'QQ：' + '<span>' + qq + '</span>';

}

function getMethod(type) {
	var color, text;
	switch (type) {
		case 0://QQ红包
			color = '242,93,93';
			text = 'QQ';
			break;
		case 1://支付宝
			color = '18,183,245';
			text = '支付宝';
			break;
		case 2://微信
			color = '9,187,7';
			text = '微信';
			break;
		// case 2://2.QQ群费
		// 	color = '252,164,84';
		// 	text = 'QQ群费';
		// 	break;
		// case 3://3.QQ群支付
		// 	color = '252,164,84';
		// 	text = 'QQ群支付';
		// 	break;
		// case 4://4.支付宝转账
		// 	color = '30,130,210';
		// 	text = '支付宝转账';
		// 	break;
		default://未知类型
			color = '0,0,0';
			text = '未知类型';
			break;
	}
	return '方式：<span style="color: rgb(' + color + ');">' + text + '</span>';
}

function getTime(time) {
	var ret;

	if (time == 1) {
		ret = '年代久远已经无法记清时间了'
	} else {
		ret = '时间：' + '<span>' + getFormatTime(time) + '</span>'
	}

	return ret;
}

function getFormatTime(nS) {
	var time = new Date(nS * 1000);
	//var format = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日' + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
	var format = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日';
	return format;
}
