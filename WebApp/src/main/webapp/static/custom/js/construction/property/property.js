$(document).ready(function() {
		var geography = function(param) {
			//获取父窗口内的ztree
			var ztree = parent.getTreeObj();
			//node节点
			var node = (ztree.getSelectedNodes())[0];
			if (node && node.category) {	//选中ztree某个节点
				if (node.category == "province") {
					param["geographyName"]= node.name;
					param["category"] = node.category;
				} else if (node.category == "city") {
					param["geographyName"]= node.name;
					param["category"] = node.category;
				} else if (node.category == "suburb") {
					param["geographyName"]= node.name;
					param["category"] = node.category;
				} else if (node.category == "community") {		    //社区节点
					param["communityId"] = (node.id.split("_"))[1]; 
				} else if (node.category == "building") {	//楼栋节点
					param["buildingId"] = (node.id.split("_"))[1];
				} else if (node.category == "unit") {		//单元节点
					param["unitId"] = (node.id.split("_"))[1];
				} else if (node.category == "property") {	//房间节点
					var parentNode = node.getParentNode();
					param["unitId"] = (parentNode.id.split("_"))[1];
				}
			} else {	//未选中ztree任何一个节点
				node = (ztree.getNodesByParam("id", "country_3", null))[0];
				param["geographyName"]= node.name;
				param["category"] = node.category;
			}
			return param;
		}
		var tables = $('#dataTable').dataTable({
				serverSide: true,//分页，取数据等等的都放到服务端去
	            processing: true,//载入数据的时候是否显示“载入中”
	            pageLength: 8,  //首次加载的数据条数
	            pagingType: "full_numbers",  //指定datables的分页样式 http://datatables.club/example/basic_init/alt_pagination.html
	            autoWidth: false,
	            stateSave: false,//保持翻页状态，和comTable.fnDraw(false);结合使用
	            searching: false,//禁用datatables搜索
	            ordering: false,
				ajax : {
					url : 'table/construction/fuzzy-property',
					type : 'GET',
					data: function (d) {
	                       var param = {};
	                       param.draw = d.draw;
	                       param.beginIndex = d.start;
	                       param.pageSize = d.length;
	                       var formData = $("#queryForm").serializeArray();//把form里面的数据序列化成数组
	                       formData.forEach(function (e) {
	                           param[e.name] = $.trim(e.value);
	                       });
	                       var paramForm = $("#construction").serializeArray();
	                       paramForm.forEach(function(e) {
	                    	   param[e.name] = $.trim(e.value);
	                       });
	                       para = geography(param);
	                       return param;//自定义需要传递的参数。
	                },
	                error: function(msg){
					}
				},
				 //跟数组下标一样，第一列从0开始，这里表格初始化时，第2列默认降序
                 "order": [[ 1, "desc" ]], 
				columns: [
						    {"data": null},
						    {"data": "propertyName"},
						    {"data": "unitName" },
						    {"data": "communityName" },
						    {"data": "status", visible: false},
						    {"data": "propertyNumber"}, 
						    {"data": "propertyId"},
						    {"data": "unitId"},
						    {"data": "communityId"},
			    ],
			    columnDefs: [
							{                          
							    defaultContent: "",
							    targets: [1,2,3,4,5]
							 },
		                	 {
		                         orderable:false,//禁用排序
		                         targets:[0,6,7,8]   //指定的列
		                     },
			                 {
			                     targets: [0],
			                     orderable:false,//禁用排序
			                     defaultContent: "<input type='checkbox' name='checkList'>"
			                 },
			                 {
			                	 targets: [6,7,8],
			                	 visible: false,
			                	 searchable: false
			                 }
			    ],
			    //操作按钮
			    language: {
	                lengthMenu: "",
	                processing: "Loading...",
	                paginate: {
	                    previous: "上页",
	                    next: "下页",
	                    first: "首页",
	                    last: "尾页"
	                },
	                zeroRecords: "无任何记录",
	                info: "总共_PAGES_ 页，显示第_START_ 到第 _END_ ，筛选之后得到 _TOTAL_ 条，总计 _MAX_ 条 ",
	                infoEmpty: "",
	                infoFiltered: "",
	                search: "关键字：",
	            },
	    });
		//查询按钮
        $("#btn-query").on("click", function () {
            //tables.fnDraw();//查询后不需要保持分页状态，回首页
            tables.fnDraw();
        });
	});