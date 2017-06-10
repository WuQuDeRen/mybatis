$(function() {
	$.validator.addMethod("saleck", function(value, element, params) {
		if(element) {
			if($.trim(value) == '') {
				return false;
			}
		}
		return true;
	}, "必选");
	var json = {
			rules: {
				companyName: {
					required: true
				},
				contactName: {
					required: true
				},
				contactNum: {
					required: true
				},
				email: {
					required: false,
					email: true
				},
				address: {
					required: true
				},
				companyDes: {
					required: true
				},
				address: {
					required: true
				},
				companyDes: {
					required: true
				},
				salesId: {
					saleck: []
				}
			},
			messages: {
				companyName: {
					required: "必填"
				},
				contactName: {
					required: "必填"
				},
				contactNum: {
					required: "必填"
				},
				email: {
					required: "选填",
					email: "请填写正确的邮件格式"
				},
				address: {
					required: "必填"
				},
				companyDes: {
					required: "必填"
				},
				address: {
					required: "必填"
				},
				companyDes: {
					required: "必填"
				},
				salesId: {
					saleck: "必选"
				}
			}
		};
	$("#form-add").validate(json);
	$("#form-edit").validate(json);
});
function check(flag) {
	if (flag == "add") {
	   return $("#form-add").valid();
	}
	if (flag == "edit") {
	   return $("#form-edit").valid();
	}
	
}
