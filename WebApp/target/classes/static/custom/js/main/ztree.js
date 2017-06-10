	//获取ztree, 主要为子窗口预留
	var getTreeObj = function() {
		var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		return treeObj;
	}
	var treeObject;
	//异步请求菜单的地址
	function getAsyncUrl(treeId, treeNode) {
	    return treeNode.childUrl;
	};
	var booleanJudge = function(treeId, treeNode, flag) {
		if (treeNode.category == "suburb") {
			var $a = $("#menu").find(".active .suburb");
			if ($a.length) {
				return false;
			}
		} else if (treeNode.category == "unit") {
			var $a = $("#menu").find(".active a.active");
			if ($a.hasClass("unit")) {
				return false;
			} else if ($a.hasClass("property")) {
				return true;
			}
		} else if (treeNode.category == "community") {
			var $a = $("#menu").find(".active a.active");
			if ($a.hasClass("community")) {
				return false;
			} else if ($a.hasClass("building")) {
				return true;
			} else if ($a.hasClass("unit")) {
				return true;
			} else if ($a.hasClass("property")) {
				return true;
			}
		} else if (treeNode.category == "building") {
			var $a = $("#menu").find(".active a.active");
			if ($a.hasClass("community")) {
				return false;
			} else if ($a.hasClass("building")) {
				return false;
			} else if ($a.hasClass("unit")) {
				return true;
			} else if ($a.hasClass("property")) {
				return true;
			}
		}
		return true;
	}
	//
	function zTreeBeforeAsync(treeId, treeNode) {
		return booleanJudge(treeId, treeNode);
	};
	function zTreeBeforeExpand(treeId, treeNode) {
		return booleanJudge(treeId, treeNode, true);
	};
	
	//添加自定义的dom
	var addDiyDom = function(treeId, treeNode) {
		if (treeNode.id.indexOf("country") != -1) {
			return;
		}
		if (!treeNode.count) {
			return;
		}
    	var aObj = $("#" + treeNode.tId + "_a");
    	if ($("#diyBtn_"+treeNode.id).length > 0) return;
    	var editStr = "<span id='diyBtn_space_" +treeNode.id+ "' class='badge' style='color: black;background-color: #337AB7'>" + treeNode.count +" </span>";
    	aObj.closest("li").append(editStr);
    }
	//添加单击事件-------------------------
	function zTreeOnClick(event, treeId, treeNode) {
	    var node = ($.fn.zTree.getZTreeObj(treeId).getSelectedNodes())[0];
	    if (node) {
	    	var $estate = $("#select-estate", window.frames[0].document);
	    	var $sale = $("#select-sale", window.frames[0].document);
	    	if (node.category == "community") {
	    		//普通管理员
	    		if ($sale && !$sale.length) {
    	    		$estate.val(node.estateId);
    	    	} else {				//超级管理员
    	    		$estate.val(node.estateId);
    	    		if (!$.trim($estate.val())) {
    	    			$estate.val("");
    	    		}
    	    	}
    	    } else if (node.category == "building") {
    	    	node = node.getParentNode();
    	    	if ($sale && !$sale.length) {
    	    		$estate.val(node.estateId);
    	    	} else {
    	    		$estate.val(node.estateId);
    	    		if (!$.trim($estate.val())) {
    	    			$estate.val("");
    	    		}
    	    	}
    	    } else if (node.category == "unit" ) {
    	    	node = node.getParentNode().getParentNode();
    	    	if ($sale && !$sale.length) {
    	    		$estate.val(node.estateId);
    	    	} else {
    	    		$estate.val(node.estateId);
    	    		if (!$.trim($estate.val())) {
    	    			$estate.val("");
    	    		}
    	    	}
    	    } else if (node.category == "property") {
    	    	node = node.getParentNode().getParentNode().getParentNode();
    	    	if ($sale && !$sale.length) {
    	    		$estate.val(node.estateId);
    	    	} else {
    	    		$estate.val(node.estateId);
    	    		if (!$.trim($estate.val())) {
    	    			$estate.val("");
    	    		}
    	    	}
    	    } else {
    	    	$estate.val("");
    	    }
	    }
	};
    var setting={
    	data:{
    		simpleData:{
    			enable: true,
    			idKey: "id",
    			pIdKey: "pId",
    			rootPId: 0
    		}
    	},
		async: {
			enable: true,
			url: getAsyncUrl,
			autoParam: ["id"],
			type: "post",
			dataType: "json",
			dataFilter: function(ztree, treeNode, data) {
				return data;
			},
			contentType: "application/json",
		},
		view: {
			showIcon: false,
			addDiyDom: addDiyDom,
			selectedMulti: false
		},
		callback: {
			onClick: zTreeOnClick,
			beforeAsync: zTreeBeforeAsync,
			beforeExpand: zTreeBeforeExpand
		}
    };
    var treeNodes=[
            {id: "country_3",pId:"0", name:"中国", isParent : true, childUrl: "table/geography/province", open : true, category: "country"}
    ];
    $(function(){
    	treeObject = $.fn.zTree.init($("#treeDemo"), setting, treeNodes);
    })
    
    $("#treeDemo_1_switch").ready(function() {
    	$("#treeDemo_1_switch").click();
    });
    $("#ztree-parent").css("height", $(".page-container").height());
    
    /*展示目录树  */
    $(".show-treeDemo").click(function() {
    	if ($(this).hasClass("suburb")) {
    		var ztree = getTreeObj();
    		var nodes = ztree.getNodesByParam("category", "suburb");
    		$.each(nodes, function(index, val) {
    			if (val.open == true) {
    				val.open = false;
        			ztree.updateNode(val);
    			}
    			ztree.hideNodes(val.children);
    		});
    	}
    	if ($(this).hasClass("community")) {
    		var ztree = getTreeObj();
    		//展开所有被隐藏的节点
    		var nodes = ztree.getNodesByParam("isHidden", true);
    		$.each(nodes, function(index, val) {
    			var parent = val.getParentNode();
    			parent.open = true;
    			ztree.updateNode(parent);
    		});
    		ztree.showNodes(nodes);
    		//隐藏必要的节点
    		nodes = ztree.getNodesByParam("category", "community");
    		$.each(nodes, function(index, val) {
    			val.open = false;
    			ztree.updateNode(val);
    			ztree.hideNodes(val.children);
    		});
    		
    	}
    	if ($(this).hasClass("building")) {
    		var ztree = getTreeObj();
    		//展开所有被隐藏的节点
    		var nodes = ztree.getNodesByParam("isHidden", true);
    		$.each(nodes, function(index, val) {
    			var parent = val.getParentNode();
    			parent.open = true;
    			ztree.updateNode(parent);
    		});
    		ztree.showNodes(nodes);
    		//隐藏必要的节点
    		nodes = ztree.getNodesByParam("category", "building");
    		$.each(nodes, function(index, val) {
    			val.open = false;
    			ztree.updateNode(val);
    			ztree.hideNodes(val.children);
    		});
    	}
    	if ($(this).hasClass("unit")) {
    		var ztree = getTreeObj();
    		//展开所有被隐藏的节点
    		var nodes = ztree.getNodesByParam("isHidden", true);
    		$.each(nodes, function(index, val) {
    			var parent = val.getParentNode();
    			parent.open = true;
    			ztree.updateNode(parent);
    		});
    		ztree.showNodes(nodes);
    		//隐藏必要的节点
    		nodes = ztree.getNodesByParam("category", "unit");
    		$.each(nodes, function(index, val) {
    			val.open = false;
    			ztree.updateNode(val);
    			ztree.hideNodes(val.children);
    		});
    	}
    	if ($(this).hasClass("property")) {
    		var ztree = getTreeObj();
    		//展开所有被隐藏的节点
    		var nodes = ztree.getNodesByParam("isHidden", true);
    		$.each(nodes, function(index, val) {
    			var parent = val.getParentNode();
    			parent.open = true;
    			ztree.updateNode(parent);
    		});
    		ztree.showNodes(nodes);
    		//隐藏必要的节点
    		nodes = ztree.getNodesByParam("category", "property");
    		$.each(nodes, function(index, val) {
    			var parent = val.getParentNode();
    			parent.open = false;
    			ztree.updateNode(val);
    			ztree.hideNodes(val);
    		});
    	}
    	
    	$("#ztree-parent").css("opacity", "1");
    	$("#container-top").animate({
    		marginLeft: "200px"
    	}, {
    		duration: 1000,
    		complete: function() {
    			$("#ztree-parent").css({
    				"display": "inline-block",
    				"z-index": 200
    			});
    		}
    	}); 
    });
    /*隐藏目录树  */
    $(".hidden-treeDemo").click(function() {
		$("#ztree-parent").css("opacity", "0");
    	$("#container-top").animate({
    		marginLeft: "0px"
    	}, {
    		duration: 1000,
    		complete: function() {
    			$("#ztree-parent").css({
    				"display": "none",
    				"z-index": -100
    			});
    		}
    	});
    });