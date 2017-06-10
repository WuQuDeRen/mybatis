$(function() {

	//------------------添加物业公司------------------------
	//添加物业公司弹窗
	$("#btn-add").on("click", function() {
		//获取父窗口内的ztree
		var ztree = parent.getTreeObj();
		// node节点
		var node = (ztree.getSelectedNodes())[0];
		if (!node || (node.category != "suburb")) {
			tipWarn("请先选择目录树中的区或县或市");
			return;
		}
		
		$("#form-add").data('validator').resetForm();
		$("#form-add")[0].reset();
		if ($("#select-sale").length) {
			$.get("table/sales/all-sales", function(data) {
				$("#select-sale option:gt(0)").remove();
				for(index in data) {
					var property = data[index];
					$("#select-sale").append('<option value="' + property["salesId"] +
						'">' + property["salesComName"] +
						'</option>');
				}
			}, "json");
		}
		var city = node.getParentNode();
		var province = city.getParentNode();
		$("#address-add").attr("title", "（不需输入省市县/区）");
		$("#address-add").attr("placeholder", province.getParentNode().name + province.name + city.name + node.name + "（不需输入省市县/区）");
		$('#myModal').modal({
			keyboard: true
		});
	});

	//提交添加物业公司信息
	$("#add-estate").on("click", function() {
		if(check("add")) {
			var currentPage = tables.api().rows({
				page: 'current'
			}).data().length;
			
			var tmp = $("#form-add").serialize();
			var pa = tmp.split("&");
			$.each(pa, function(index, val) {
				if (val.indexOf("address") != -1) {
					var tmpStr = val.split("=");
					//获取父窗口内的ztree
					var ztree = parent.getTreeObj();
					// node节点
					var node = (ztree.getSelectedNodes())[0];
					var city = node.getParentNode();
					var province = city.getParentNode();
					var value = province.getParentNode().name + province.name + city.name + node.name;
					tmpStr[0] = tmpStr[0] + "=" + value + tmpStr[1];
					pa[index] = tmpStr[0];
				}
			});
			$.ajax({
				type: "post",
				url: "table/company/add-estate",
				data: pa.join("&"),
				dataType: "json",
				success: function(data) {
					if (data.result == 'success') {
						//刷新表格
						tables.fnDraw();
						tipSuccess("物业公司添加成功");
					} else {
						tipWarn("物业公司添加失败(可能是由于重复添加公司)");
					}
				},
				complete: function() {
					$('#myModal').modal('hide');
				}
			});
		}
	});

});