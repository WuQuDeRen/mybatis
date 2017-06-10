$(function() {
	var tables = $('#dataTable').dataTable(
	  {
		serverSide: true, //分页，取数据等等的都放到服务端去
		responsive: {
			details: {
				type: 'column',
				target: -1
			}
		},
		processing: true, //载入数据的时候是否显示“载入中”
		pageLength: 8, //首次加载的数据条数
		pagingType: "full_numbers", //指定datables的分页样式 http://datatables.club/example/basic_init/alt_pagination.html
		autoWidth: false,
		stateSave: false, //保持翻页状态，和comTable.fnDraw(false);结合使用
		searching: false, //禁用datatables搜索
		destroy:true,
		ajax: {
			url: 'table/company/fuzzy-estate',
			type : 'GET',
			data: function(d) {
				var param = {};
				param.draw = d.draw;
				param.beginIndex = d.start;
				param.pageSize = d.length;
				var formData = $("#queryForm").serializeArray(); //把form里面的数据序列化成数组
				formData.forEach(function(e) {
					param[e.name] = $.trim(e.value);
				});
				return param;
			},
			error: function(msg){
			}
		},
		 
		//跟数组下标一样，第一列从0开始，这里表格初始化时，第2列默认降序
		"order": [[1, "desc"]],
		columns: [{
			"data": null,
			"createdCell": function(cell, cellData, rowData, rowIndex, colIndex) {
				$(cell).css("max-width", "30");
				$(cell).css("text-align", "center");
			}
		}, {
			"data": "companyName"
		}, {
			"data": "contactName"
		}, {
			"data": "contactNum"
		}, {
			"data": "email"
		}, {
			"data": "address",
			"createdCell": function(cell, cellData, rowData, rowIndex, colIndex) {
				$(cell).css("text-align", "left");
			}
		}, {
			"data": "companyDes"
		}, {
			"data": null
		},{
			"data": null,
		}],
		columnDefs: [
		 {
			 orderable : false,
			 targets: [0,1,2,3,4,5,6,7]
		 },
		{
			orderable: false, //禁用排序
			targets: [0, 7] //指定的列
		}, {
			targets: 0,
			orderable: false, //禁用排序
			defaultContent: "<input type='checkbox' name='checkList'>"
		}, {
			className: 'control',
			orderable: false,
			targets:   -1,
			defaultContent: "",
			createdCell: function(td) {
				$(td).css("width", "25px");
			}
		},{
			targets: 4,
			defaultContent: ""
		}, {
			targets: 7,
			createdCell: function(td) {
				$(td).css("width", "90px");
			},
			defaultContent: "<div class='btn-group'><button type='button' class='btn btn-success btngroup'>命令按钮</button></div>"
		/*	defaultContent: "<div class='btn-group'>" +
				"<button type='button' class='btn btn-success details-control' id='content-tr' style='margin-left: 1px;margin-top: 1px;'><i class='glyphicon glyphicon-edit'></i>明细</button>" +
				"<button type='button' class='btn btn-success edit-row' id='editRow' style='margin-left: 1px;margin-top: 1px;'><i class='glyphicon glyphicon-edit'></i>编辑</button>" +
				"<button type='button' class='btn btn-success del-row' id='delRow' style='margin-left: 1px;margin-top: 1px;'><i class='glyphicon glyphicon-edit'></i>删除</button>" +
				"</div>"*/
		}, {
			targets: [1, 2, 3, 4, 5, 6],
			defaultContent: ''
		}],
		//操作按钮
		language: {
			lengthMenu: "",
			processing: "Loading...",
			paginate: {
				previous: "上一页",
				next: "下一页",
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
	window.tables = tables;
	//刷新按钮
	$("#btn-re").on("click", function() {
		tables.fnDraw(false); //刷新保持分页状态
	});
	//查询按钮
	$("#btn-query").on("click", function() {
		//tables.fnDraw();//查询后不需要保持分页状态，回首页
		tables.fnDraw();
	});
	//DataTables的翻页事件
    $('#dataTable').on('page.dt', function () {
    	$("#checkAll").prop("checked", false);
    });
    $.extend({
    	getDatables: function() {
    		return tables;
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
});
