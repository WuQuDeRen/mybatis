//修改物业信息
$("#editRow").on("click", function () {
	$("#form-edit")[0].reset();
	var data = $.getDatables().api().row($(".btngroup.active").closest("tr")).data();
	
	$("#userId-edit").val(data.userId);
	//隐藏按钮组
	//$("#btngroup").modal('hide');
	$('#myModal-edit').modal({
		keyboard : true
	});
});
$("#edit-amdin").on("click", function() {
	var $form_data = $("#form-edit").serializeArray();
	var param = {};
	var roleId = [];
	$.each($form_data, function(index, val) {
		if (val.name == "roleId") {
			roleId.push(val.value);
			param[val.name] = roleId;
		} else {
			param[val.name] = val.value;
		}
	});
	console.info(JSON.stringify(param));
	$.ajax({
		type: "post",
		url: "table/admin/update-admin",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(param),
		success: function(data) {
			if (data.result == "success") {
				tipSuccess("操作成功");
			} else {
				tipSuccess("操作失败");
			}
		}
	});
});