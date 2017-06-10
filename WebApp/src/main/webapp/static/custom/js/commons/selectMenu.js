$(function() {
	$(".select-sale").change(function() {
		estateSel(this, $(this).closest("form"));
	});
	$(".select-estate").change(function() {
		resetSel(this, $(this).closest("form"));
		communitySel(this, $(this).closest("form"));
	});
	$(".select-community").change(function() {
		resetSel(this, $(this).closest("form"));
		buildingSel(this, $(this).closest("form"));
	});
	$(".select-building").change(function() {
		resetSel(this, $(this).closest("form"));
		unitSel(this, $(this).closest("form"));
	});
	$(".select-unit").change(function() {
		resetSel(this, $(this).closest("form"));
		propertySel(this, $(this).closest("form"));
	});
	$(".select-property").change(function() {
		resetSel(this, $(this).closest("form"));
	});
});
// 抓取经销商
var saleSel = function(current, $parent) {
	resetSel(current, $parent);
	if (!$parent && !$parent.length) {
		$parent = $(current).closest("form");
	}
	$.ajax({
		type : "GET",
		url : "table/sales/all-sales",
		contentType : "application/json;charset=UTF-8",
		dataType : "json",
		success : function(data) {
			for (index in data) {
				var property = data[index];
				$parent.find(".select-sale").append(
						'<option value="' + property["salesId"] + '">'
								+ property["salesComName"] + '</option>');
			}
		},
		error : function() {

		}
	});
}
// 抓取物业
var estateSel = function(current, $parent, isFirst) {
	resetSel(current, $parent);
	var param = '';
	if ($parent && $parent.length && !isFirst) {
		var saleId = $parent.find(".select-sale").val();
		if ($.isEmptyObject(saleId)) {
			return;
		}
		param = $parent.find(".select-sale").serialize();
	}
	$.ajax({
		type : "GET",
		url : "table/company/all-estate",
		contentType : "application/json;charset=UTF-8",
		data : param,
		dataType : "json",
		success : function(data) {
			for (index in data) {
				var property = data[index];
				$parent.find(".select-estate").append(
						'<option value="' + property["companyId"] + '">'
								+ property["companyName"] + '</option>');
				
				
				//改变物业公司默认选项
				var node = (parent.getTreeObj().getSelectedNodes())[0];
			    if (node) {
			    	var $estate = $("#select-estate");
			    	if (node.category == "community") {
			 	    	$estate.val(node.estateId);
			 	    } else if (node.category == "building") {
			 	    	node = node.getParentNode();
			 	    	$estate.val(node.estateId);
			 	    } else if (node.category == "unit" ) {
			 	    	node = node.getParentNode().getParentNode();
			 	    	$estate.val(node.estateId);
			 	    } else if (node.category == "property") {
			 	    	node = node.getParentNode().getParentNode().getParentNode();
			 	    	$estate.val(node.estateId);
			 	    } else {
			 	    	$estate.val("");
			 	    }
			    }
				
			}
		},
		error : function() {

		}
	});
}
// 抓取社区
var communitySel = function(current, $parent) {
	var param = '';
	if ($parent && $parent.length) {
		var estateId = $parent.find(".select-estate").val();
		if ($.isEmptyObject(estateId)) {
			return;
		}
		param = $parent.find(".select-estate").serialize();
	}
	$.ajax({
		type : "GET",
		url : "table/construction/community-estate",
		dataType : "json",
		data : param,
		success : function(data, status, xhr) {
			for (index in data) {
				var property = data[index];
				$parent.find(".select-community").append(
						'<option value="' + property["communityId"] + '">'
								+ property["communityName"] + '</option>');
			}
		},
		error : function() {

		}
	});
}
// 抓取栋
var buildingSel = function(current, $parent) {
	var param = '';
	if ($parent && $parent.length) {
		var communityId = $parent.find(".select-community").val();
		if ($.isEmptyObject(communityId)) {
			return;
		}
		param = $parent.find(".select-community").serialize();
	}
	$.ajax({
		type : "GET",
		url : "table/construction/building-comm",
		dataType : "json",
		data : param,
		success : function(data, status, xhr) {
			for (index in data) {
				var property = data[index];
				$parent.find(".select-building").append(
						'<option value="' + property["buildingId"] + '">'
								+ property["buildingName"] + '</option>');
			}
		},
		error : function() {

		}
	});
}
// 抓取单元
var unitSel = function(current, $parent) {
	var param = '';
	if ($parent && $parent.length) {
		var buildingId = $parent.find(".select-building").val();
		if ($.isEmptyObject(buildingId)) {
			return;
		}
		param = $parent.find(".select-building").serialize();
	}
	$.ajax({
		type : "GET",
		url : "table/construction/all-unit",
		dataType : "json",
		data : param,
		success : function(data, status, xhr) {
			for (index in data) {
				var property = data[index];
				$parent.find(".select-unit").append(
						'<option value="' + property["unitId"] + '">'
								+ property["unitName"] + '</option>');
			}
		},
		error : function() {

		}
	});
}
// 抓取房间
var propertySel = function(current, $parent) {
	var param = '';
	if ($parent && $parent.length) {
		var unitId = $parent.find(".select-unit").val();
		if ($.isEmptyObject(unitId)) {
			return;
		}
		param = $parent.find(".select-unit").serialize();
	}
	$.ajax({
		type : "GET",
		url : "table/construction/all-property",
		dataType : "json",
		data : param,
		success : function(data, status, xhr) {
			for (index in data) {
				var property = data[index];
				$parent.find(".select-property").append(
						'<option value="' + property["propertyId"] + '">'
								+ property["propertyName"] + '</option>');
			}
		},
		error : function() {

		}
	});
}

// 重置表单的select
var resetSel = function(current, $parent_form) {
	// 获取当前表单下所有的select
	$select_form = $parent_form.find("select");
	// 重置select
	var start = $select_form.index($(current)) + 1;
	var end = $select_form.length;
	var afterElement = $select_form.slice(start, end);
	afterElement.not(".exclude-select").val("");
	afterElement.not(".exclude-select").find("option:gt(0)").remove();
}
