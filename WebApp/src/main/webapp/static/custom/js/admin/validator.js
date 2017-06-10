$(function() {
	$.validator.addMethod("ckChinese", function(val, ele, param) {
		if (!/^[\w]+$/.test(val)) {
			return false;
		}
		return true;
	}, "不能出现中文以及特殊符号(如空格)");
	$("#form-add").validate({
		rules: {
			accountName: {
				required: true,
				ckChinese: []
			},
			userName: {
				required: true
			},
			roleId: {
				required: true
			},
			saleId: {
				required: true
			}
		},
		messages: {
			accountName: {
				required: "必须填写",
				ckChinese: "不能出现中文以及特殊符号(如空格)"
			},
			userName: {
				required: "必须填写"
			},
			roleId: {
				required: "必须填写"
			},
			saleId: {
				required: "必须填写"
			}
		},
		errorPlacement: function(error, element) {
		    error.appendTo(element.parent());
		}
	});
});