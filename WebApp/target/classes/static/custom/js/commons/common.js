//获取url中的信息
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);
//参数追加_csrf
(function ($) {
    $.csrf  = function () {
		var header= $("meta[name='_csrf_header']").attr("content");
		var token= $("meta[name='_csrf']").attr("content");
		$(document).ajaxSend(function(event, xhr, options) {
			xhr.setRequestHeader(header, token);
		});
	    $(document).ajaxError(function(event, xhr, options) {
	      if(xhr.status == 403) {
	        alert("你无足够权限");
	      }
	    });
	    $(document).ajaxComplete(function(event,xhr,settings){
	          if (xhr.responseText == 'timeout') { //超时标识
	        	  top.location.href= 'sign/login'; //跳转到登录页面
	          }
	    });
    }
})(jQuery);
//日期格式化仿照SimpleDateFormat
(function($) {
	$.formatDate = function(pattern, date) {
		// 如果不设置，默认为当前时间
		if (!date)
			date = new Date();
		if (typeof (date) === "string") {
			if (date == "")
				date = new Date();
			else
				date = new Date(date.replace(/-/g, "/"));
		} else {
			date = new Date(parseInt(date));
		}
		/* 补00 */
		var toFixedWidth = function(value) {
			var result = 100 + value;
			return result.toString().substring(1);
		};

		/* 配置 */
		var options = {
			regeExp : /(yyyy|M+|d+|h+|m+|s+|ee+|ws?|p)/g,
			months : [ 'January', 'February', 'March', 'April', 'May', 'June',
					'July', 'August', 'September', 'October', 'November',
					'December' ],
			weeks : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
					'Friday', 'Saturday' ]
		};

		/* 时间切换 */
		var swithHours = function(hours) {
			return hours < 12 ? "AM" : "PM";
		};

		/* 配置值 */
		var pattrnValue = {
			"yyyy" : date.getFullYear(), // 年份
			"MM" : toFixedWidth(date.getMonth() + 1), // 月份
			"dd" : toFixedWidth(date.getDate()), // 日期
			"hh" : toFixedWidth(date.getHours()), // 小时
			"mm" : toFixedWidth(date.getMinutes()), // 分钟
			"ss" : toFixedWidth(date.getSeconds()), // 秒
			"ee" : options.months[date.getMonth()], // 月份名称
			"ws" : options.weeks[date.getDay()], // 星期名称
			"M" : date.getMonth() + 1,
			"d" : date.getDate(),
			"h" : date.getHours(),
			"m" : date.getMinutes(),
			"s" : date.getSeconds(),
			"p" : swithHours(date.getHours())
		};

		return pattern.replace(options.regeExp, function() {
			return pattrnValue[arguments[0]];
		});
	};
})(jQuery);
