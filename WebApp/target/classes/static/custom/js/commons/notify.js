//tip 消息内容
var tip = function(content, contentType, icon, appendToEle) {
	if (!appendToEle) {
		appendToEle = 'body';
	}
	var notify = $.notify({
			icon: icon,
			message: content
		}, {
			element: appendToEle,
			type : contentType,
			spacing: 45,
			z_index: 20310,
			position : "absolute",
			placement : {
				from : "top",
				align : "center"
			},
			animate : {
				enter : 'animated zoomInDown',
				exit : 'animated zoomOutUp'
			},
			delay : 1000,
			timer : 1000
	});
}
var tipSuccess = function(content, appendToEle) {
	if (appendToEle) {
		tip(content, "success", "glyphicon glyphicon-ok-sign", appendToEle);
	} else {
		tip(content, "success", "glyphicon glyphicon-ok-sign");
	}
}
var tipWarn = function(conent, appendToEle) {
	if (appendToEle) {
		tip(conent, "danger", "glyphicon glyphicon-warning-sign", appendToEle);
	} else {
		tip(conent, "danger", "glyphicon glyphicon-warning-sign");
	}
	
}
