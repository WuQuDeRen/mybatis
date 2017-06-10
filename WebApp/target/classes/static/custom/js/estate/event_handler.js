//模态框配置
$(".modal-dialog").draggable(); // 为模态对话框添加拖拽
$("#myModal").css("overflow", "hidden"); // 禁止模态对话框的半透明背景滚动

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

//----------------修改物业公司信息------------------

//修改物业信息
$("#dataTable").on("click", ".edit-row", function() {
	$("#form-edit").data('validator').resetForm();
	var data = tables.api().row($(this).parents("tr")).data();
	$("#name-edit").val(data.companyName);
	$("#person-edit").val(data.contactName);
	$("#num-edit").val(data.contactNum);
	$("#email-edit").val(data.email);
	$("#address-edit").val(data.address);
	$("#desc-edit").text(data.companyDes);
	$("#companyId-edit").val(data.companyId);
    if ($("#select-sale-edit").length) {
    	$.get("table/sales/all-sales", function(data, textStatus, jqXHR) {
    		$("#select-sale-edit option:gt(0)").remove();
    		for(index in data) {
    			var property = data[index];
    			$("#select-sale-edit").append(
    				'<option value="' + property["salesId"] +
    				'">' + property["salesComName"] +
    				'</option>');
    		}
    	}, "json");
    }
	$('#myModal-edit').modal({
		keyboard: true
	});

});

//修改物业公司信息
$("#edit-estate").on("click", function() {
	if(check("edit")) {
		var $sale_edit = $("#select-sale-edit");
		if($sale_edit.length > 0) {
			var saleId = $.trim($("#select-sale-edit").val());
			if(saleId == "pick" || saleId == "") {
				tipWarn("请选择经销商!!!");
				return;
			}
		}
		$.ajax({
			type: "POST",
			url: "table/company/update-company",
			dataType: "json",
			data: $("#form-edit").serialize(),
			success: function(data) {
				if(data.result == "success") {
					tipSuccess("修改成功！！！");
					tables.api().draw(false);
					$("#myModal-edit").modal('hide');
				} else {
					tipWarn("修改失败！！！");
				}
			},
			error: function() {
				
			},
			complete: function(){
				
			}
		});
	}
});

//----------------------------删除操作---------------------
//单个删除
$("#dataTable").on("click", ".del-row", function() {
	var data = tables.api().row($(this).parents("tr")).data();
	var $tr = tables.api().row($(this).parents("tr"));
	$('#delete-estate').modal('show');
	$('#delete-submit').on("click", function() {
		$.ajax({
			type: "POST",
			url: "table/company/del-estate",
			data: "companyId=" + data.companyId,
			dataType: "json",
			success: function(data) {
				if(data.result == "success") {
					$tr.remove().draw(false);
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
			}
		});
		$('#delete-submit').off("click");
	});
});
//批量删除
$("#btn-delAll").click(function() {
	var param = [];
	$("input[name='checkList']:checked").each(function(index) {
		var data = tables.api().row($(this).parents("tr")).data();
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
			success: function(data) {
				if (data.result = "success") {
					//刷新表格
					tables.fnDraw();
					tipSuccess("成功删除！！！");
				} else {
					tipWarn("删除失败！！！");
				}
			},
			error: function() {
				
			},
			complete: function() {
				$('#delete-estate').modal('hide');
			}
		});
		$('#delete-submit').off("click");
	});
});

//--------------明细信息----------------------
//显示物业公司所管理的社区
$("#dataTable").on("click", ".details-control", function() {
	var tr = $(this).closest('tr');
	var row = tables.api().row(tr);
	if(row.child.isShown()) {
		// This row is already open - close it
		row.child.hide();
		tr.removeClass('shown');
	} else {
		// Open this row
		var d = row.data();
		var companyId = d.companyId;
		var flag = 'div' + Math.round(Math.random() * 10000);
		row.child('<div id="' + flag + '" style="text-align:left;"><span style="color:red; font-weight: bold;">所管理的社区:</span></div>').show();
		tr.addClass('shown');
		$.get("table/company/all-community", "companyId=" + companyId, function(data, textStatus, jqXHR) {
			for(index in data) {
				var current = data[index];
				$("#" + flag).append(
					'<span style="padding-left: 15px;">' + current["communityName"] + '</span>'
				);
			}
			if(data.length == 0) {
				$("#" + flag).append(
					'<span style="padding-left: 15px;">未管理社区</span>'
				);
			}

		}, "json");
	}
});
//---------------------多选----------------------
//checkbox全选
	$("#table-parent").on("click", "#checkAll", function() {
		if($(this).prop("checked") === true) {
			$("input[name='checkList']").prop("checked", $(this).prop("checked"));
			$("#dataTable tbody tr").addClass('selected');
			$(this).hasClass('selected')
		} else {
			$("input[name='checkList']").prop("checked", false);
			$("#dataTable tbody tr").removeClass('selected');
		}
	});