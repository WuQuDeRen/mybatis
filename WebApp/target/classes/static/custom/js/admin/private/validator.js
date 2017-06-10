$(function() {
	$.validator.addMethod("ckChinese", function(val, ele, param) {
		if (val == "" || !/^[\w]+[\w]$/.test(val)) {
			return false;
		}
		return true;
	}, "不能出现中文");
	$("#updateInfo").validate({
		rules: {
			accountName: {
				required: true,
				ckChinese: []
			},
			userName: {
				required: true
			}
		},
		messages: {
			accountName: {
				required: "必须填写",
				ckChinese: "不能出现中文"
			},
			userName: {
				required: "必须填写"
			}
		},
		errorPlacement: function(error, element) {
		    error.appendTo(element.parent());
		}
	});
});