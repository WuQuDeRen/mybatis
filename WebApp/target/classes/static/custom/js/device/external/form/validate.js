$(function() {
	$.validator.addMethod("compareDate", function(value, element) {
		var deviceProduceDate = $("#deviceProduceDate").val();
		var deviceOutFactoryDate = $("#deviceOutFactoryDate").val();
		var reg = new RegExp('-', 'g');
		deviceProduceDate = deviceProduceDate.replace(reg, '/');// 正则替换
		deviceOutFactoryDate = deviceOutFactoryDate.replace(reg, '/');
		deviceProduceDate = new Date(parseInt(Date.parse(deviceProduceDate), 10));
		deviceOutFactoryDate = new Date(parseInt(Date.parse(deviceOutFactoryDate), 10));
		if (deviceProduceDate > deviceOutFactoryDate) {
			return false;
		} else {
			return true;
		}
	}, "出厂日期必须大于生产日期");
	var ckField = {
			rules : {
				estateId : {
					required : true
				},
				communityId : {
					required : true
				},
				buildingId : {
					required : true
				},
				unitId : {
					required : true
				},
				deviceName : {
					required : true
				},
				description : {
					required : true
				},
				deviceProduceDate : {
					required : true
				},
				deviceOutFactoryDate : {
					required : true,
					compareDate: []
				},
				status : {
					required : false
				},
				deviceType : {
					required : true
				}

			},
			messages : {
				estateId : {
					required : "必填"
				},
				communityId : {
					required : "必填"
				},
				buildingId : {
					required : "必填"
				},
				unitId : {
					required : "必填"
				},
				deviceName : {
					required : "必填"
				},
				description : {
					required : "必填"
				},
				deviceProduceDate : {
					required : "必填"
				},
				deviceOutFactoryDate : {
					required : "必填",
					compareDate: "出厂日期必须大于生产日期"
				},
				status : {
					required : "必填"
				},
				deviceType : {
					required : "选填"
				}
			}
	};
	var place = {
		errorElement: "em",
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().next());
		}
	};
	$("#form-add").validate($.extend({}, ckField, place));
	$("#form-edit").validate(ckField);
	$.extend({
		checkForm : function($form) {
			return $form.valid();
		}
	});
});
