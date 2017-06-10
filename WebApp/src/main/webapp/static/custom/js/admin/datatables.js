$(document).ready(function() {
	var tables = $('#dataTable').dataTable({
		serverSide: true,//分页，取数据等等的都放到服务端去
		responsive: {
			details: {
				type: 'column',
				target: -1
			}
		},
        processing: true,//载入数据的时候是否显示“载入中”
        pageLength: 8,  //首次加载的数据条数
        pagingType: "full_numbers",  //指定datables的分页样式 http://datatables.club/example/basic_init/alt_pagination.html
        autoWidth: false,
        stateSave: false,//保持翻页状态，和comTable.fnDraw(false);结合使用
        searching: false,//禁用datatables搜索
        ordering: false,
        destroy: true,
		 ajax : {
			url : 'table/amdin/fuzzy-admin',
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
                   var formData = $("#construction").serializeArray();//把form里面的数据序列化成数组
                   formData.forEach(function (e) {
                       param[e.name] = $.trim(e.value);
                   });
                   return param;//自定义需要传递的参数。
            }, 
            error: function(msg) {}
		},  
		 //跟数组下标一样，第一列从0开始，这里表格初始化时，第2列默认降序
         "order": [[ 1, "desc" ]], 
		columns: [
				    {"data": null},
				    {"data": "accountName" },
				    {"data": "userName" },
				    {"data": "createDate",
				      render: function(d) {
				    	  var cla = new Date(d);
				    	  var mon = cla.getMonth();
				    	  var day = cla.getDate();
				    	  mon += 1;
				    	  if (mon < 10) {
				    		  mon = "0" + mon;
				    	  }
				    	  if (day < 10) {
				    		  day = "0" + day;
				    	  }
				    	  return cla.getFullYear() + "-" + mon 
				    	  + "-" + day;
				      }
				    },
				    {"data": "status" },
				    {"data": null},
				    {"data": null}
	    ],
	    columnDefs: [
	                 {
	                	 	className: 'control',
							orderable: false,
							targets:   6,
							defaultContent: '',
							createdCell: function(td) {
								$(td).css("width", "25px");
							}
	                 },
	                	 {
	                         orderable:false,//禁用排序
	                         targets:[0,5]   //指定的列
	                     },
	                 {
	                     targets: 0,
	                     orderable:false,//禁用排序
	                     defaultContent: "<input type='checkbox' name='checkList'>",
	                     createdCell: function(td) {
	                    	 $(td).css("width", "25px");
	                     }
	                 },
	                 {
	                	 targets: 5,
	                	 createdCell: function(td) {
	                		 $(td).css("width", "90px");
	                	 },
	                	 defaultContent: "<div class='btn-group'><button type='button' class='btn btn-success btngroup'>操作按钮</button></div>"
	                 },
	                 {
	                	 defaultContent: '',
	                	 targets: [1,2,3,4]
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
            info: "总共_PAGES_ 页，显示第_START_ 到第 _END_ ，筛选之后得到 _TOTAL_ 条",
            infoEmpty: "",
            infoFiltered: "",
            search: "关键字：",
        }
	});
	$.extend({
		getDatables: function() {
			return tables;
		}
	});
});
