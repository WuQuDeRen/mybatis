$(function() {

	//----------------------------删除操作---------------------
	//单个删除
	$("#delRow").on("click", function() {
		var data = $.getDatables().api().row($(".btngroup.active").closest("tr")).data();
		var $tr = $(".btngroup.active").closest("tr")
		$('#delete-estate').modal('show');
		$('#delete-submit').on("click", function() {
			$.ajax({
				type: "POST",
				url: "table/company/del-estate",
				data: "companyId=" + data.companyId,
				dataType: "json",
				beforeSend: function() {
					$("#delete-submit").attr("disabled", "disabled");
				},
				success: function(data) {
					if(data.result == "success") {
						$.getDatables().fnDraw();
						tipSuccess("删除成功!!");
					}
					if(data.result == "fail") {
						tipWarn("物业公司下有社区无法删除，请登录物业平台");
					}
				},
				error: function() {
					tipWarn("出现未知错误");
				},
				complete: function() {
					$('#delete-estate').modal('hide');
					//隐藏按钮组
					$("#btngroup").modal('hide');
					$("#delete-submit").removeAttr("disabled");
				}
			});
			$('#delete-submit').off("click");
		});
	});
	//批量删除
	$("#btn-delAll").click(function() {
		var param = [];
		$("input[name='checkList']:checked").each(function(index) {
			var data = $.getDatables().api().row($(this).parents("tr")).data();
			param.push(data.companyId);
		});
		if(param.length < 1) {
			tipWarn("至少选择一个");
			return;
		}
		$('#delete-estate').modal('show');
		var length = param.length + "";
		/*var currentPageLen = tables.api().rows({
			page: 'current'
		}).data().length;*/
		$('#delete-submit').on("click", function() {
			$.ajax({
				type: "POST",
				url: "table/company/del-estate",
				data: "companyId=" + param.join("&companyId="),
				dataType: "json",
				beforeSend: function() {
					$("#delete-submit").attr("disabled", "disabled");
				},
				success: function(data) {
					if (data.result = "success") {
						//刷新表格
						$.getDatables().fnDraw();
						tipSuccess("成功删除！！！");
					} else {
						tipWarn("删除失败！！！");
					}
				},
				error: function() {
					
				},
				complete: function() {
					$('#delete-estate').modal('hide');
					$("#delete-submit").removeAttr("disabled");
				}
			});
			$('#delete-submit').off("click");
		});
	});
});