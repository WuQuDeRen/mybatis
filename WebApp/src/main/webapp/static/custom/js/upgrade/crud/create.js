$(function() {
	//为添加按钮绑定事件
	$("#btn-add").click(function() {
		$("#form-add").data('validator').resetForm();
		$("#form-add")[0].reset();
		$(".showFileName").text("");
		$('#external-add').modal({
			backdrop: true
		});
	});
	
	//增加室外机------------------------------------------
	$("#apk-add").click(function() {
		if (!$.checkForm($("#form-add"))) {
			return;
		}
		var formData = new FormData($("#form-add").get(0));
		$.ajax({
		   type: "POST",
		   url: 'apk/upload',
		   processData: false,
		   contentType: false,
		   dataType: "json",
		   data: formData,
		   beforeSend: function() {
			   $("#apk-add").attr("disabled", "disabled");
		   },
		   success: function(data, status, xhr) {
			   if (data.result == "success") {
				  tipSuccess(" 上传成功！！！");
				  window.tables.fnDraw(false);// 刷新保持分页状态
				  $('#external-add').modal('hide');
			   } else {
				   tipWarn("上传失败（可能已经上传）！！！");
			   }
		   },
		   complete: function() {
			   $("#apk-add").removeAttr("disabled");
		   }
		});
	});
});
