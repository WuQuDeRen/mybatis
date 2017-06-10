$(function() {
	var tables = $('#dataTable').dataTable(
		{
			responsive: {
				details: {
					type: 'column',
					target: 8
				}
			},
			serverSide : true,// 分页，取数据等等的都放到服务端去
			processing : true,// 载入数据的时候是否显示“载入中”
			paging: true, //分页
			pageLength : 8, // 首次加载的数据条数
			pagingType : "full_numbers", // 指定datables的分页样式
			// http://datatables.club/example/basic_init/alt_pagination.html
			autoWidth : false,
			stateSave : false,// 保持翻页状态，和comTable.fnDraw(false);结合使用(这个很重要)
			searching : false,// 禁用datatables搜索
			destroy:true,
			ajax : {
				url : 'apk/list',
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
						"data" : "type"
					},
					{
						"data" : "version"
					},
					{
						"data" : "adminName"
					},
					{
						"data" : "uploadDate",
						/* 返回值为该列要显示的数据 */
						render : function(data, type, row) {
							data = $.formatDate("yyyy-MM-dd", data);
							return data;
						}
					}, {
						"data" : "status"
					}, {
						"data" : "description"
					},  {
						"data" : null
					},{
						"data" : null
					}],
			columnDefs : [
					{
						className: 'control',
						orderable: false,
						targets:   8,
						defaultContent: '',
						createdCell: function (td, cellData, rowData, row, col) {
							$(td).css("width", "39px");
						}
					} ,
					{
						orderable : false,// 禁用排序
						targets : [ 0, 1, 2, 3, 4, 5, 6, 7],
						// 指定的列
					},
					{
						targets : [ 0 ],
						orderable : false,// 禁用排序
						defaultContent : "<input type='checkbox' name='checkList'>",
						createdCell: function (td, cellData, rowData, row, col) {
							$(td).css("width", "39px");
						}
							
					},
					{
						targets : [ 7 ],
						createdCell: function (td, cellData, rowData, row, col) {
							$(td).css('width', '85px');
					       },
				       defaultContent :
								"<div class='btn-group'>"
							    + "<button type='button' class='btn btn-success btngroup' >命令按钮</button>"
								+ "</div>"
					} ],
			// 操作按钮
			language : {
				lengthMenu : "",
				processing : "Loading...",
				paginate : {
                        previous: "上一页",
                        next: "下一页",
                        first: "第一页",
                        last: "最后"
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
    	getDatables : function() {
    		return tables;
    	}
    });
});