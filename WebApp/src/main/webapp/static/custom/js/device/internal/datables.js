$(function() {
	var tables = $('#dataTable').dataTable(
		{
			responsive: {
				details: {
					type: 'column',
					target: -1
				}
			},
			serverSide : true,// 分页，取数据等等的都放到服务端去
			processing : true,// 载入数据的时候是否显示“载入中”
			pageLength : 8, // 首次加载的数据条数
			pagingType : "full_numbers", // 指定datables的分页样式
			// http://datatables.club/example/basic_init/alt_pagination.html
			autoWidth : false,
			stateSave : false,// 保持翻页状态，和comTable.fnDraw(false);结合使用(这个很重要)
			searching : false,// 禁用datatables搜索
			destroy:true,
			ajax : {
				url : 'table/dev/fuzzy-intdev',
				type : 'GET',
				data : function(d) {
					var param = {};
					param.draw = d.draw;
					param.beginIndex = d.start;
					param.pageSize = d.length;
					var queryForm = $("#queryForm").serializeArray();// 把form里面的数据序列化成数组
					queryForm.forEach(function(e) {
						param[e.name] = $.trim(e.value);
					});
					var paramForm = $("#construction").serializeArray();
					paramForm.forEach(function(e) {
						param[e.name] = $.trim(e.value);
					});
					//获取父窗口内的ztree
					var ztree = parent.getTreeObj();
					//node节点
					var node = (ztree.getSelectedNodes())[0];
					if (node && node.category) {
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
							param["propertyId"] = (node.id.split("_"))[1];
						} else {	//未选中ztree任何一个节点
							node = (ztree.getNodesByParam("id", "country_3", null))[0];
							param["geographyName"]= node.name;
							param["category"] = node.category;
						}
					}
					return param;// 自定义需要传递的参数。
				},
				error: function(msg){
				}
			},
			// 跟数组下标一样，第一列从0开始，这里表格初始化时，第2列默认降序
			"order" : [ [ 1, "desc" ] ],
			columns : [
					{
						"data" : null
					},
					{
						"data" : "deviceName"
					},
					{
						"data" : "deviceType"
					},
					{
						"data" : "description"
					},
					{
						"data" : "deviceProduceDate",
						/* 返回值为该列要显示的数据 */
						render : function(data, type, row) {
							data = $.formatDate("yyyy-MM-dd", data);
							return data;
						}
					},
					{
						"data" : "deviceOutFactoryDate",
						/* 返回值为该列要显示的数据 */
						render : function(data, type, row) {
							data = $.formatDate("yyyy-MM-dd", data);
							return data;
						}
					}, {
						"data" : "status"
					}, {
						"data" : "version"
					}, {
						"data" : null
					},{
						"data" : null
					},{
						"data" : null
					} ],
			columnDefs : [
					{
						orderable : false,// 禁用排序
						targets : [ 0, 7, 8 ]
					// 指定的列
					},
					{
						targets : [ 0 ],
						orderable : false,// 禁用排序
						defaultContent : "<input type='checkbox' name='checkList'>",
						createdCell: function(td) {
							$(td).css("width", "39px");
						}
					},
					{
						targets : [ 7 ],
						searchable : false,
						createdCell: function(td) {
							$(td).addClass("pai");
						},
						render: function(data, type, row, meta) {
							if (data) {
								return "<span class='version'>" + data + "</span>";
							} else {
								return "<span class='version' >" + "版本未知" + "<span>";
							}
						}
					},
					{
						targets : [ 8 ],
						createdCell: function (td, cellData, rowData, row, col) {
							$(td).css('width', '70px');
					     },
				    	 defaultContent :
								"<div class='btn-group'>"
							    + "<button type='button' class='btn btn-success btngroup' >命令按钮</button>"
								+ "</div>"
						/*defaultContent :
							"<div class='btn-group'>"
						    + "<button type='button' class='btn btn-success edit' style='margin-left: 1px;margin-top: 1px;'><i class='glyphicon glyphicon-edit'></i>编辑</button>"
							+ "<button type='button' class='btn btn-success del' id='delRow' style='margin-left: 1px;margin-top: 1px;'><i class='glyphicon glyphicon-trash'></i>删除</button>"
							+ "</div>"*/
					},{
						targets: [1,2,3,4,5,6],
						defaultContent: ''
					}, {
						targets: [9],
						visible: false,
						createdCell: function (td, cellData, rowData, row, col) {
							$(td).css('width', '100px');
				         },
						render: function(data, type, row, meta) {
							var content = "<div class='btn-group'>" 
								   + "<button type='button' class='btn btn-success download' id='download' style='margin-left: 1px;margin-top: 1px;'><i class='glyphicon glyphicon-download-alt'></i>更新设备</button>"
								   + "</div>";
							return content;
						}
					},{
						className: 'control',
						orderable: false,
						targets:   -1,
						defaultContent: ''
					}   ],
			// 操作按钮
			language : {
				lengthMenu : "",
				processing : "Loading...",
				paginate : {
					previous : "上一页",
					next : "下一页",
					first : "首页",
					last : "尾页"
				},
				zeroRecords : "无任何记录",
				info : "总共_PAGES_ 页，显示第_START_ 到第 _END_ ，筛选之后得到 _TOTAL_ 条，总计 _MAX_ 条 ",
				infoEmpty : "",
				infoFiltered : "",
				search : "关键字：",
			}
		});
    window.tables = tables;
	//查询按钮
    $("#btn-query").on("click", function () {
        //tables.fnDraw();//查询后不需要保持分页状态，回首页
        tables.fnDraw();
    });
    $.extend({
    	getDatables: function() {
    		return tables;
    	} 
    });
    //----------------datatables的多选--------------------------
    // checkbox全选
    $("#dataTable").on("click","#checkAll", function() {
		if ($(this).prop("checked") === true) {
			$("input[name='checkList']").prop("checked", $(this).prop("checked"));
			//$("#dataTable tbody tr").addClass('selected');
			$(this).hasClass('selected');
		} else {
			$("input[name='checkList']").prop("checked", false);
			//$("#dataTable tbody tr").removeClass('selected');
		}
	});
    //DataTables的翻页事件
    $('#dataTable').on('page.dt', function () {
    	$("#checkAll").prop("checked", false);
    });
    
    $("#table").on("mouseover mouseout", "tr", function(event) {
   	 var data = $.getDatables().api().row($(this)).data();
   	 $td = $(this).find(".pai");
   	 if(event.type == "mouseover"){
   		 if (data && (data.update == "true")) {
   			 $td.find(".version").css("display", "none");
   			 $td.append("<span class='up' style='font-weight: bolder;margin-right: 5px;'>程序升级 <span class='glyphicon glyphicon-chevron-right'></span></span>");
   		 }
		 } else if(event.type == "mouseout"){
			 if (data && (data.update == "true")) {
   			 $td.find(".version").css("display", "inline-block");
   			 $td.find(".up").remove();
   		 }
		 }
   });
});