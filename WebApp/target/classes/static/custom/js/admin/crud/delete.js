var batchHandler = function(param) {
	$("#delete-admin").modal('hide');
	$.ajax({
		type: "post",
		url: "table/admin/del-admin",
		dataType: "json",
		data: "userId=" + param.join("&userId="),
		success: function(rvt) {
			$.each(rvt, function(index, val) {
    			if (val.result == "success") {
    				tipSuccess("删除成功");
    				$.getDatables().fnDraw();
    			} else {
    				tipWarn("删除失败!!!");
    			}
    		});
		}
	});
}
  $(".del-single").on("click", function() {
	    var data = $.getDatables().api().row($(".btngroup.active").closest("tr")).data();
		data = [data.userId];
		//隐藏按钮组
		//$("#btngroup").modal('hide');
		$("#delete-admin").modal('show');
		$("#delete-submit").one("click", function() {
			batchHandler(data);
		});
});

//批量删除
$("#btn-delAll").click(function() {
	var param = [];
	$("input[name='checkList']:checked").each(function(index) {
		var data = $.getDatables().api().row($(this).parents("tr")).data();
		param.push(data.userId);
	});
	if (param.length < 1) {
		tipWarn("至少选择一个");
		return;
	}
	$("#delete-admin").modal('show');
	$("#delete-submit").one("click", function() {
		batchHandler(param);
	});
});