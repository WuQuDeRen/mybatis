//按钮组模态框
$('#btngroup').on('hidden.bs.modal', function () {
	$(".btngroup").removeClass("active");
});
//表格中的按钮
$("#table-parent").on("click", ".btngroup", function() {
	$("div.zIndex").css("z-index", "2000");
	//展示按钮组
	$("#btngroup").modal('show');
	$(this).addClass("active");
	
	$("#select-role-edit").empty();
	$("#adminAuthority").empty();
	$("#communityDetails").empty();
	
	var data = $.getDatables().api().row($(".btngroup.active").closest("tr")).data();
	//查询角色
	$.ajax({
		type: "get",
		url: "table/role/id-role",
		dataType: "json",
		data: "userId=" + data.userId,
		success: function(data) {
			$.each(data, function(index, val) {
				var content = '<label class="checkbox-inline">'
				    + '<input type="checkbox" name="roleId" value="'+ val["roleId"] +'"';
				if (val.has) {
					content += 'checked>' + val["roleDesc"]  + '</label>';
				} else {
					content += '>' + val["roleDesc"]  + '</label>';
				}
				$("#select-role-edit").append(content);
				$("#adminAuthority").append(content);
			});
		}
	});
	//查询管理物业
	if (!data.saleId) {
		$("#communityDetails").append("超级管理员不负责具体物业管理");
		return;
	}
	$.ajax({
		type: "get",
		url: "table/company/all-estate",
		dataType: "json",
		data: "saleId=" + data.saleId,
		success: function(data) {
			$.each(data, function(index, val) {
				var content = '<label class="checkbox-inline">'
				    + '<input type="checkbox" checked name="roleId" value="'+ val["companyName"] +'"';
				content += '>' + val["companyName"]  + '</label>';
				$("#communityDetails").append(content);
			});
		}
	});
});

$("#content-details").click(function() {
	$("#admin-details").modal('show');
});
