$(function() {
	//为添加按钮绑定事件
	$("#btn-add").click(function() {
		//获取父窗口内的ztree
		var ztree = parent.getTreeObj();
		// node节点
		var node = (ztree.getSelectedNodes())[0];
		if (!node || (node.category != "unit")) {
			tipWarn("请先选择目录树中的单元");
			return;
		}
		
		$("#form-add").data('validator').resetForm();
		$("#form-add")[0].reset();
		//fillForm($("#construction"));
		var buildingNode = node.getParentNode();
		var communityNode = buildingNode.getParentNode();
		$.ajax({
			type: "post",
			url: "table/geography/estate",
			dataType: "json",
			data: "id=" + communityNode.id,
			success: function(data) {
				//物业设置
				$("#estate-add").val(data.companyId);
				$("#estatename-add").val(data.companyName);
			},
			error: function() {
				 tipWarn(" 出错！！！");
			}
		});
		//社区设置
		$("#communityname-add").val(communityNode.name);
		$("#community-add").val(communityNode.id.split("_")[1]);
		//楼栋设置
		$("#buildingname-add").val(buildingNode.name);
		$("#building-add").val(buildingNode.id.split("_")[1]);
		//单元设置
		$("#unitname-add").val(node.name);
		$("#unit-add").val(node.id.split("_")[1]);
		$("#tip-loc").text(node.name);
		
		$('#external-add').modal({
			backdrop: true
		});
	});
	
	//位置前缀--------------------------------------------
	$("#unit-add").change(function() {
		$("#tip-loc").text($(this).find("option:selected").text());
	});
	
	//增加室外机------------------------------------------
	$("#dev-add").click(function() {
		if (!$.checkForm($("#form-add"))) {
			return;
		}
		var param = {
			deviceName : $("#device-name").val(),
			description : $("#device-loc").val(),
			deviceProduceDate: $("#deviceProduceDate").val(),
			deviceOutFactoryDate: $("#deviceOutFactoryDate").val(),
			status : $("#device-status").val(),
			deviceType : $("#device-type").val(),
			data : {
				communityId : $("#community-add").val(),
				communityName: $("#community-add option:selected").text(),
				buildingId : $("#building-add").val(),
				buildingName: $("#building-add option:selected").text(),
			    unitId: $("#unit-add").val(),
				unitName: $("#unit-add option:selected").text()
			}
		}; 
		$.ajax({
		   type: "POST",
		   url: 'table/dev/add-extdev',
		   contentType: "application/json;charset=UTF-8",
		   dataType: "json",
		   data: JSON.stringify(param),
		   success: function(data, status, xhr) {
			   if (data.result == "success") {
				  tipSuccess(" 添加成功！！！");
				   //alert("添加成功"); 
				  window.tables.fnDraw(false);// 刷新保持分页状态
				  $('#external-add').modal('hide');
			   } else {
				   tipWarn(data.messageTip);
			   }
		   }
		});
	});
});
