$(function() {
	//发出废弃请求---------------------------------------------------
	var delSingle = function() {
		var data = $.getDatables().api().row($(".btngroup.active").closest("tr")).data();
		$.ajax({
			type: "GET",
			url : "apk/disabled",
			dataType: "json",
			contentType: "application/json",
			data: "fileId="+ data.id,
			beforeSend: function() {
				$("#delete-submit").attr("disabled", "disabled");
			},
			success: function(data) {
				$.each(data, function(index, val) {
					if (val.result == "success") {
						//刷新表格
						$.getDatables().fnDraw(false);
						tipSuccess("操作成功");
		    		} else {
		    			tipWarn("操作失败");
		    		}
				});
			},
			complete: function() {
				//隐藏按钮组
				$("#btngroup").modal('hide');
				$("#delete-external").modal('hide');
				$("#delete-submit").removeAttr("disabled");
			}
		});
    	$("#delete-submit").off("click");
	}
	//发出批量废弃请求
	function delBatch() {
		var param = [];
		var $input = $("input[name='checkList']:checked");
    	$("input[name='checkList']:checked").each(function(index) {
    		var data = tables.api().row($(this).parents("tr")).data();
    		param.push(data.id);
    	});
    	if ($input.length < 1) {
    		tipWarn("至少选择一个删除");
    		return;
    	}
		$.ajax({
			type: "GET",
			url : "apk/disabled",
			dataType: "json",
			contentType: "application/json",
			data: "fileId=" + param.join("&fileId="),
			beforeSend: function() {
				$("#delete-submit").attr("disabled", "disabled");
			},
			success: function(data) {
				$.each(data, function(index, val) {
					if (val.result != "success") {
						tipWarn("文件禁用失败");
					}
				});
				$.getDatables().fnDraw(false);
			},
			complete: function() {
				$("#delete-external").modal('hide');
				$("#delete-submit").removeAttr("disabled");
			}
		});
	}
	//为批量废弃添加按钮
	$("#btn-delAll").click(function() {
		$("#delete-external").modal({
			backdrop: true
		});
		var current = this;
		$("#delete-submit").on("click", function() {
			delBatch();
		});
	});
	//为每条记录设置废弃
	$("#delRow").on("click", function() {
		$("#delete-external").modal({
			backdrop: true
		});
		$("#delete-submit").on("click", function() {
			delSingle();
		});
	});
});