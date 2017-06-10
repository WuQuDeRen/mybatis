$(function() {

	//修改每条记录--------------------------------------------
	$("#editRow").on("click", function() {
		$("#form-edit").data('validator').resetForm();
		// 获取行数据
		var current = $(".btngroup.active").closest("tr");
		var data = $.getDatables().api().row($(".btngroup.active").closest("tr")).data();
		$("#device-name-edit").val(data.deviceName);
		
		$("#status-edit").val(data.status);
        //展示编辑模态框
		$("#edit-internal").modal();
		
		$("#dev-edit").click(function() {
			if (!$.checkForm($("#form-edit"))) {
				return;
			}
			var param = {
					deviceId: data.deviceId,
					deviceName: data.deviceName,
					status: $("#status-edit").val(),
					propertyId: data.propetyId
			};
			$.ajax({
				   type: "POST",
				   url: 'table/dev/update-intdev',
				   contentType: "application/json;charset=UTF-8",
				   dataType: "json",
				   data: JSON.stringify(param),
				   success: function(data, status, xhr) {
					   if (data.result == "success") {
						   tipSuccess(data.messageTip);
						  window.tables.fnDraw(false);// 刷新保持分页状态
						  $('#edit-internal').modal('hide');
						  var $td = current.find("td");
						  $td.eq(6).text($("#status-edit").val());
						  $("#dev-edit").off("click");
					   } else {
						   tipWarn(data.messageTip);
					   }
				   },
				   complete: function() {
					  //隐藏按钮组
					  $("#btngroup").modal('hide');
				   }
			});
		});
	});
});