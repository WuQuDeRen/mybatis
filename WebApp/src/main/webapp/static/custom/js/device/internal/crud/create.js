$(function() {
	//为添加按钮绑定事件
	$("#btn-add").click(function() {
		//获取父窗口内的ztree
		var ztree = parent.getTreeObj();
		// node节点
		var node = (ztree.getSelectedNodes())[0];
		if (!node || (node.category != "property")) {
			tipWarn("请先选择目录树中的房间");
			return;
		}
		$("#form-add").data('validator').resetForm();
		$("#form-add")[0].reset();
		
		var unitNode = node.getParentNode();
		var buildingNode = unitNode.getParentNode();
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
		//社区信息
		$("#community-add").val(communityNode.id.split("_")[1]);
		$("#communityname-add").val(communityNode.name);
		//楼栋信息
		$("#building-add").val(buildingNode.id.split("_")[1]);
		$("#buildingname-add").val(buildingNode.name);
		//单元信息
		$("#unit-add").val(unitNode.id.split("_")[1]);
		$("#unitname-add").val(unitNode.name);
		//房间信息
		$("#property-add").val(node.id.split("_")[1]);
		$("#propertyname-add").val(node.name);
		
		$('#internal-add').modal({
			backdrop: true
		});
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
				unitName: $("#unit-add option:selected").text(),
				propertyId: $("#property-add").val(),
				propertyName: $("#property-add option:selected").text()
			}
		}; 
		$.ajax({
		   type: "POST",
		   url: 'table/dev/add-intdev',
		   contentType: "application/json;charset=UTF-8",
		   dataType: "json",
		   data: JSON.stringify(param),
		   beforeSend: function() {
			   $("#dev-add").attr("disabled", "disabled");
		   },
		   success: function(data, status, xhr) {
			   if (data.result == "success") {
				  tipSuccess(data.messageTip);
				  window.tables.fnDraw(false);// 刷新保持分页状态
				  $('#internal-add').modal('hide');
			   } else {
				   tipWarn(data.messageTip);
			   }
		   },
		   complete: function() {
			   $("#dev-add").removeAttr("disabled", "disabled");
		   }
		});
	});
});