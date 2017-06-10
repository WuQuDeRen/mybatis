$(function() {
	//修改每条记录--------------------------------------------
	$("#editRow").on("click", function() {
		//隐藏按钮组
		$("#btngroup").modal('hide');
		$("#form-edit").data('validator').resetForm();
		// 获取行数据
		var current = $(".btngroup.active").closest("tr");
		var data = $.getDatables().api().row($(".btngroup.active").closest("tr")).data();
		$("#device-name-edit").val(data.deviceName);
		$("#status-edit").val(data.status);
		$("#loc-edit").val(data.description);
		
        $("#dev-id").val(data.deviceId); 
        $("#unit-edit").val(data.unitId);
        
		$("#edit-external").modal();
		$("#dev-edit").click(function() {
			if (!$.checkForm($("#form-edit"))) {
				return;
			}
			var param = {
					deviceId: data.deviceId,
					description: $("#loc-edit").val(),
					status: $("#status-edit").val(),
					unitId: data.unitId
			};
			$.ajax({
				   type: "POST",
				   url: 'table/dev/update-dev',
				   contentType: "application/json;charset=UTF-8",
				   dataType: "json",
				   data: JSON.stringify(param),
				   success: function(data, status, xhr) {
					   if (data.result == "success") {
						  tipSuccess(data.messageTip);
						  window.tables.fnDraw(false);// 刷新保持分页状态
						  $('#edit-external').modal('hide');
						  var $td = current.find("td");
						  $td.eq(6).text($("#status-edit").val());
						  $td.eq(3).text($("#loc-edit").val());
						  $("#dev-edit").off("click");
					   } else {
						   tipWarn(data.messageTip);
					   }
				   }
			});
		});
	});
});
	