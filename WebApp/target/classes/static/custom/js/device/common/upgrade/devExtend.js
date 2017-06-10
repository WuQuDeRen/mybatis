$(function() {
	var handler = function(url, param, success) {
		$.ajax({
	 		type: "post",
	 		url: url,
	 		data: JSON.stringify($.extend({src: "dm"}, param)),
	 		dataType: "json",
	 		contentType: "application/json;charset=UTF-8",
	 		success: success
		});
	};
	$.extend({
		delVideoPost: function(url, param, success) {
			handler(url, param, success);
		},
		upgradeDevPost: function(url, param, success) {
			handler(url, param, success);
		}
	});
});