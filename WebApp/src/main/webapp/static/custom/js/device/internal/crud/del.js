$(function() {
	//发出删除请求---------------------------------------------------
	var delSingle = function(current) {
		var data = $.getDatables().api().row($(".btngroup.active").closest("tr")).data();
		$.ajax({
			type: "GET",
			url : "table/dev/del-intdev",
			dataType: "json",
			contentType: "application/json",
			data: "deviceName="+ data.deviceName,
			beforeSend: function() {
				$("#delete-submit").attr("disabled", "disabled");
			},
			success: function(data) {
				if (data.result == "success") {
					//刷新表格
					tables.fnDraw();
					tipSuccess(data.messageTip);
	    		} else {
	    			tipWarn(data.messageTip);
	    		}
			},
			complete: function() {
				//隐藏按钮组
				$("#btngroup").modal('hide');
				$("#delete-internal").modal('hide');
				$("#delete-submit").removeAttr("disabled");
			}
		});
    	$("#delete-submit").off("click");
	}
	//发出批量删除请求
	function delBatch() {
		var param = [];
		var $input = $("input[name='checkList']:checked");
		$input.each(function(index) {
    		var data = tables.api().row($(this).parents("tr")).data();
    		param.push(data.deviceName);
    	});
		$.ajax({
			type: "GET",
			url : "table/dev/del-intdev",
			dataType: "json",
			contentType: "application/json",
			data: "deviceName=" + param.join("&deviceName="),
			beforeSend: function() {
				$("#delete-submit").attr("disabled", "disabled");
			},
			success: function(data) {
				if (data.result == "success") {
					//刷新表格
					tables.fnDraw();
					tipSuccess(data.messageTip);
	    		} else {
	    			tipWarn(data.messageTip);
	    		}
			},
			complete: function() {
				$("#delete-internal").modal('hide');
				$("#delete-submit").removeAttr("disabled");
			}
		});
	}
	//为批量删除添加按钮
	$("#btn-delAll").click(function() {
		var $input = $("input[name='checkList']:checked");
		if ($input.length < 1) {
    		tipWarn("至少选择一个删除");
    		return;
    	}
		$("#delete-internal").modal({
			backdrop: true
		});
		var current = this;
		$("#delete-submit").on("click", function() {
			delBatch();
		});
	});
	//为每条记录设置删除
	$("#delRow").on("click", function() {
		$("#delete-internal").modal({
			backdrop: true
		});
		var current = this;
		$("#delete-submit").on("click", function() {
			delSingle(current);
		});
	});
});