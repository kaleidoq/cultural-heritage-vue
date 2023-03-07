export function fileThousand(value) { //转换喜欢的数量，上千
	if (value / 10000 > 1) {
		value = (value / 10000).toFixed(1)
		return value + '万'
	} else return value
}

// 分割tag标签
export function splitTag(tag) {
	// console.log(tag)
	if (tag != null) {
		var tags = tag.split('|')
		return tags
	}
}

// 人性化时间格式
export function gettime(shorttime) {
	shorttime = new Date(shorttime).getTime()
	// shorttime = new Date(shorttime).getTime()
	shorttime = shorttime.toString().length < 13 ? shorttime * 1000 : shorttime;
	let now = (new Date()).getTime();
	let cha = (now - parseInt(shorttime)) / 1000;
	let year = (new Date('2022-12-31T16:00:00.000Z')).getTime();
	let chaYear = (parseInt(shorttime) - year) / 1000;
	if (cha < 43200) {
		// 当天
		return dateFormat(new Date(shorttime), "{A} {t}:{ii}");
	} else if (cha < chaYear) {
		// 隔天 显示日期+时间
		return dateFormat(new Date(shorttime), "{Mon}月{DD}日 {A} {t}:{ii}");
	} else {
		// 隔年 显示完整日期+时间
		return dateFormat(new Date(shorttime), "{Y}-{MM}-{DD} {A} {t}:{ii}");
	}
}


//获得精确到天的方法
export function getDate(date) {
	//date是传过来的时间戳，注意需为13位，10位需*1000
	//也可以不传,获取的就是当前时间
	var time = new Date(date);
	var year = time.getFullYear() //年
	var month = ("0" + (time.getMonth() + 1)).slice(-2); //月
	var day = ("0" + time.getDate()).slice(-2); //日
	var mydate = year + "-" + month + "-" + day;
	return mydate
}

// 获取当前时间差值
// export function getChatTime(v1, v2) {
// 	v1 = v1.toString().length < 13 ? v1 * 1000 : v1;
// 	v2 = v2.toString().length < 13 ? v2 * 1000 : v2;
// 	if (((parseInt(v1) - parseInt(v2)) / 1000) > 300) {
// 		return this.gettime(v1);
// 	}
// }

// 获取聊天时间（相差300s内的信息不会显示时间）
export function getChatTime(v1, v2) {
	v1 = v1.toString().length < 13 ? v1 * 1000 : v1;
	v2 = v2.toString().length < 13 ? v2 * 1000 : v2;
	if (((parseInt(v1) - parseInt(v2)) / 1000) > 300) {
		return this.gettime(v1);
	}
}

// 非整十前添加0
function parseNumber(num) {
	return num < 10 ? "0" + num : num;
}


function dateFormat(date, formatStr) {
	let dateObj = {},
		rStr = /\{([^}]+)\}/,
		mons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
	dateObj["Y"] = date.getFullYear();
	dateObj["M"] = date.getMonth() + 1;
	dateObj["MM"] = parseNumber(dateObj["M"]);
	dateObj["Mon"] = mons[dateObj['M'] - 1];
	dateObj["D"] = date.getDate();
	dateObj["DD"] = parseNumber(dateObj["D"]);
	dateObj["h"] = date.getHours();
	dateObj["hh"] = parseNumber(dateObj["h"]);
	dateObj["t"] = dateObj["h"] > 12 ? dateObj["h"] - 12 : dateObj["h"];
	dateObj["tt"] = parseNumber(dateObj["t"]);
	dateObj["A"] = dateObj["h"] > 12 ? '下午' : '上午';
	dateObj["i"] = date.getMinutes();
	dateObj["ii"] = parseNumber(dateObj["i"]);
	dateObj["s"] = date.getSeconds();
	dateObj["ss"] = parseNumber(dateObj["s"]);

	while (rStr.test(formatStr)) {
		formatStr = formatStr.replace(rStr, dateObj[RegExp.$1]);
	}
	return formatStr;
}


// 计算指定时间与当前的时间差
export function sumAge(data) {
	let dateBegin = new Date(data.replace(/-/g, "/"));
	let dateEnd = new Date(); //获取当前时间
	let dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
	let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
	let leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
	let hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
	//计算相差分钟数
	let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
	let minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
	//计算相差秒数
	let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
	let seconds = Math.round(leave3 / 1000)
	return dayDiff + "天 " + hours + "小时 ";
}
