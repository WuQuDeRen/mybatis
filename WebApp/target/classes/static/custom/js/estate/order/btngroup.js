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
	
});
//绑定明细事件
$("#content-details").click(function() {
	var data = $.getDatables().api().row($(".btngroup.active").closest("tr")).data();
	$("#communityDetails").empty();
	$.get("table/company/all-community", "companyId=" + data.companyId, function(data, textStatus, jqXHR) {
		$.each(data, function(index, val) {
			var content = '<label class="checkbox-inline">'
			    + '<input type="checkbox" checked name="roleId" value="'+ val["communityName"] +'"';
			content += '>' + val["communityName"]  + '</label>';
			$("#communityDetails").append(content);
		});
		if(data.length == 0) {
			$("#communityDetails").append(
				'<div style="">未管理社区</div>'
			);
		}

	}, "json");
	$("#admin-details").modal('show');
});
