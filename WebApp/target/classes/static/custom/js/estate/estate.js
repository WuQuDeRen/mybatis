var Estate = function() {
    function tip(title, info) {
	   var d = dialog({zIndex: 10000, quickClose: true, id: "tip-dialog"}).title(title).content(info).show();	
	   setTimeout(function() {
    	   d.close().remove();
       }, 1500);
	}
	function validateDialog(info, obj) {
		var dial = dialog({title: '警告',height: 10,align: 'top', zIndex: 10000,quickClose: true, id:"val-dialog"}).content(info).showModal(obj.get(0));
		
	}
	function check(flag) {
		var nameInfo = $.trim($('#name-' + flag).val());
		var personInfo = $.trim($('#person-' + flag).val());
		var numInfo = $.trim($('#num-' + flag).val());
		var emailInfo = $.trim($('#email-' + flag).val());
		var addressInfo = $.trim($('#address-' + flag).val());
		var descInfo = $.trim($('#desc-' + flag).val());
		if (nameInfo == "") {
			validateDialog('请输入公司名',$('#name-' + flag));
			return false;
		}
		if (personInfo == "") {
			validateDialog('请输入公司负责人名',$('#person-' + flag));
			return false;
		}
		if (personInfo.length > 10) {
			validateDialog('公司负责人民超过十个字符',$('#person-' + flag));
			return false;
		}
		if (numInfo == "" || !/^1[34578]\d{9}$/.test(numInfo)) {
			validateDialog('请按照正确的格式输入手机号',$('#num-' + flag));
			return false;
		}
		if (emailInfo != "" && !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(emailInfo)) {
			validateDialog('邮箱格式不正确',$('#email-' + flag));
			return false;
		}
		if (addressInfo == "") {
			validateDialog('请输入详细地址',$('#address-' + flag));
			return false;
		}
		if (addressInfo.length > 20) {
			validateDialog('地址字符数超过20字符',$('#address-' + flag));
			return false;
		}
		if (descInfo == "") {
			validateDialog('请输入公司描述信息', $('#desc-' + flag));
			return false;
		}
		if (descInfo.length > 100) {
			validateDialog('描述信息查过100字', $('#desc-' + flag));
			return false;
		}
		
		return true;
	}
	return {
		init : function() {
			$(document).ready(function() {
				var basePath = $('base').attr("href");
				var tables = $('#dataTable').dataTable({
						serverSide: true,//分页，取数据等等的都放到服务端去
						responsive: true, 
			            processing: true,//载入数据的时候是否显示“载入中”
			            pageLength: 8,  //首次加载的数据条数
			            pagingType: "full_numbers",  //指定datables的分页样式 http://datatables.club/example/basic_init/alt_pagination.html
			            autoWidth: false,
			            stateSave: false,//保持翻页状态，和comTable.fnDraw(false);结合使用
			            searching: false,//禁用datatables搜索
			            ajax: function(d, callback, settings) { //d代表datables默认要上传服务器的参数, callback用于绘制datatables表格
			            	   var param = {};
		                       param.draw = d.draw;
		                       param.beginIndex = d.start;
		                       param.pageSize = d.length;
		                       var formData = $("#queryForm").serializeArray();//把form里面的数据序列化成数组
		                       formData.forEach(function (e) {
		                           param[e.name] = e.value;
		                       });
		                       var sale = $("#sale-id");
		                       if (sale.length > 0 && $("#sale-id option:selected").val() != "pick") {
		                    	   param.saleId = $("#sale-id option:selected").val();
		                       }
			            	   $.ajax({
				            		url : 'table/company/fuzzy-estate',
									type : 'GET',
									data: param,
									dataType: "json",
									//调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
		                            //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
									success: function(data, status, jqXHR) {
										callback(data);
									},
									error: function(msg){
									}
				               });
			            },
						/*ajax : {
							url : 'table/company/fuzzy-estate',
							type : 'GET',
							data: function (d) {
			                       var param = {};
			                       param.draw = d.draw;
			                       param.beginIndex = d.start;
			                       param.pageSize = d.length;
			                       var formData = $("#queryForm").serializeArray();//把form里面的数据序列化成数组
			                       formData.forEach(function (e) {
			                           param[e.name] = e.value;
			                       });
			                       var sale = $("#sale-id");
			                       if (sale.length > 0 && $("#sale-id option:selected").val() != "pick") {
			                    	   param.saleId = $("#sale-id option:selected").val();
			                       }
			                        return param;//自定义需要传递的参数。
			                },
			                dataFilter: function(data, textStatus) {
			                    try{
			                       var json = $.parseJSON(data);
			                    }catch(e) {
			                       
			                    }
			                	
			                	console.info(json);
			                	if (json) {
			                		return data;
			                	} else {
			                		console.info(data);
			                	}
			                }
						},  */
						 //跟数组下标一样，第一列从0开始，这里表格初始化时，第2列默认降序
		                 "order": [[ 1, "desc" ]], 
						columns: [
								    {"data": null},
								    {"data": "companyName" },
								    {"data": "contactName" },
								    {"data": "contactNum" },
								    {"data": "email" },
								    {"data": "address" },
								    {"data": "companyDes" },
								    {"data": null}
					    ],
					    columnDefs: [
					                	 {
					                         orderable:false,//禁用排序
					                         targets:[0,7]   //指定的列
					                     },
					                 {
					                     targets: 0,
					                     orderable:false,//禁用排序
					                     defaultContent: "<input type='checkbox' name='checkList'>"
					                 },
					                 {
					                    targets: 4,
					                    defaultContent: ""
					                 },
					                 {
					                	 targets: 7,
					                	 /*  "visible": false,     //进行列隐藏
					                     "searchable": false, */
					                	 defaultContent:
					                		 "<div class='btn-group'>"
					                		+ "<button type='button' class='btn btn-success details-control' id='content-tr' style='margin-left: 1px;margin-top: 1px;'><i class='glyphicon glyphicon-edit'></i>明细</button>"
			                                + "<button type='button' class='btn btn-success ' id='editRow' style='margin-left: 1px;margin-top: 1px;'><i class='glyphicon glyphicon-edit'></i>编辑</button>"
					                        + "<button type='button' class='btn btn-success ' id='delRow' style='margin-left: 1px;margin-top: 1px;'><i class='glyphicon glyphicon-edit'></i>删除</button>"
					                        + "</div>"
					                 },
					                 {   
					                	 targets: [1,2,3,4,5,6],
					                	 defaultContent: ''
					                 }
					    ],
					    //操作按钮
					    language: {
			                lengthMenu: "",
			                processing: "Loading...",
			                paginate: {
			                    previous: "<",
			                    next: ">",
			                    first: "<<",
			                    last: ">>"
			                },
			                zeroRecords: "无任何记录",
			                info: "总共_PAGES_ 页，显示第_START_ 到第 _END_ ，筛选之后得到 _TOTAL_ 条，总计 _MAX_ 条 ",
			                infoEmpty: "",
			                infoFiltered: "",
			                search: "关键字：",
			            },
			    });
				$(".modal-dialog").draggable();// 为模态对话框添加拖拽
				$("#myModal").css("overflow", "hidden");// 禁止模态对话框的半透明背景滚动
				//查询按钮
		        $("#btn-query").on("click", function () {
		            //tables.fnDraw();//查询后不需要保持分页状态，回首页
		            tables.fnDraw();
		        });
				//添加物业公司弹窗
				$("#btn-add").on("click", function() {
					$("#form-add")[0].reset();
					$.get("table/sales/all-sales", function(data) {
		            		$("#select-sale").empty();
							$("#select-sale").prepend(
									'<option value="pick">请选择经销商</option>');
							for (index in data) {
								var property = data[index];
								$("#select-sale").append(
										'<option value="' + property["salesId"]
												+ '">' + property["salesComName"]
												+ '</option>');
							}
							if ($("#select-sale option").length < 1) {
								$("#select-sale").append(
										'<option value="pick">无销售公司</option>');
							}
					 }, "json");
					$('#myModal').modal({
						keyboard : true
					});
				});
				//
				$("#construction").on("change","#sale-id", function() {
		        	tables.fnDraw();
		        });
				//刷新按钮
		        $("#btn-re").on("click", function() {
		    		tables.fnDraw(false);//刷新保持分页状态
		    	});
				//提交添加物业公司信息
				$("#add-estate").on("click",function() {
					if (check("add")) {
						var $sale_add = $("#select-sale");
						if($sale_add.length>0) {
							var saleId = $.trim($("#select-sale").val());
							if (saleId == "pick" || saleId == "") {
								alert("请选择经销商");
								return;
							}
						}
						var currentPage = tables.api().rows({page: 'current'}).data().length;
						$.post(basePath + "table/company/add-estate",$("#form-add").serialize(),function(data) {
			            		if (data == "0") {
									if (currentPage == tables.api().page.len()) {
										//单页面长度本页长度时跳转到下一页
										var nextLen = tables.api().page();
										tables.api().page(nextLen+1).draw(false);
									} else {
										tables.fnDraw(false);//刷新保持分页状态
									}
									//alert("添加成功");
									tip("成功", "添加成功");
									$('#myModal').modal('hide');
								} 
								if (data == "1") {
									tip("失败", "添加失败所传递的物业信息未传到服务器");
								}
								if (data == "2") {
									//alert("添加失败");
									tip("失败", "添加失败，该物业公司已经注册在本系统中");
								}
						}, "text");
					}
				});
				//修改物业信息
				$("#dataTable tbody").on("click", "#editRow", function (){
					//$("#form-edit")[0].reset();
					var data = tables.api().row($(this).parents("tr")).data();
					$("#name-edit").val(data.companyName);
					$("#person-edit").val(data.contactName);
					$("#num-edit").val(data.contactNum);
					$("#email-edit").val(data.email);
					$("#address-edit").val(data.address);
					$("#desc-edit").text(data.companyDes);
					$("#companyId-edit").val(data.companyId);
					
					$.get("table/sales/all-sales", function(data, textStatus, jqXHR) {
		            		$("#select-sale-edit").empty();
							$("#select-sale-edit").prepend(
									'<option value="pick">请选择经销商</option>');
							for (index in data) {
								var property = data[index];
								$("#select-sale-edit").append(
										'<option value="' + property["salesId"]
												+ '">' + property["salesComName"]
												+ '</option>');
							}
							if ($("#select-sale-edit option").length < 1) {
								$("#select-sale-edit").append(
										'<option value="pick">无销售公司</option>');
							}
					 }, "json");
					
					$('#myModal-edit').modal({
						keyboard : true
					});
					
				});
				//修改物业公司信息
				$("#edit-estate").on("click", function() {
					if (check("edit")) {
						var $sale_edit = $("#select-sale-edit");
						if($sale_edit.length>0) {
							var saleId = $.trim($("#select-sale-edit").val());
							if (saleId == "pick" || saleId == "") {
								alert("请选择经销商");
								return;
							}
						}
						$.get(basePath + "table/company/update-company",$("#form-edit").serialize(), function(data, textStatus, jqXHR) {
			            		if (data == "true") {
									tip("成功", "修改成功");
									tables.api().draw(false);
									$("#myModal-edit").modal('hide');
								} else {
									tip("失败", "修改失败");
								}
						}, "text");
					}
				});
				//显示物业公司所管理的社区
				$("#dataTable tbody").on("click", "#content-tr", function() {
					var tr = $(this).closest('tr');
			        var row = tables.api().row( tr );
			        if ( row.child.isShown() ) {
			            // This row is already open - close it
			            row.child.hide();
			            tr.removeClass('shown');
			        }
			        else {
			            // Open this row
			            var d = row.data();
			            var companyId = d.companyId;
					    var flag = 'div'+ Math.round(Math.random()*10000);
			            row.child( '<div id="'+flag+'" style="text-align:left;"><span style="color:red; font-weight: bold;">所管理的社区:</span></div>' ).show();
			            tr.addClass('shown');
			            $.get(basePath + "table/company/all-community","companyId="+companyId, function(data, textStatus, jqXHR) {
			            		for(index in data) {
				 				   var current = data[index];
				 				   $("#" + flag).append(
				 				      '<span style="padding-left: 15px;">'+current["communityName"]+'</span>'
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
				//单个删除
		        $("#dataTable tbody").on("click", "#delRow", function () {
		            var data = tables.api().row($(this).parents("tr")).data();
		            if(confirm("是否确认删除这条信息?")){
		            	$.post(basePath+"table/company/del-estate","companyId="+data.companyId,function(data, textStatus, jqXHR) {
		            			if (data.result == "success") {
			            			tables.api().row($(this).parents("tr")).remove().draw(false);
			            			tip("成功", "删除成功!!");
			            		} 
			            		if (data.result == "fail")  {
			            			tip("失败", data.messageTip + "等物业公司下有社区无法删除，请登录物业平台");
			            		}
//		            	},"text");
		            },"json");
		            }
		        });
		        //批量删除
		        $("#btn-delAll").click(function() {
		        	var param = [];
		        	$("input[name='checkList']:checked").each(function(index) {
		        		var data = tables.api().row($(this).parents("tr")).data();
		        		param.push(data.companyId);
		        	});
		        	if (param.length < 1) {
		        		tip("提醒", "至少选择一个");
		        		return;
		        	}
		        	if(confirm("是否确认删除这条信息?")){
		        		var length = param.length + "";
		        		var currentPageLen = tables.api().rows({page: 'current'}).data().length;
		            	$.post(basePath+"table/company/del-estate","companyId="+param.join("&companyId="),function(data, textStatus, jqXHR) {
		            			if (data.number == length) {
			            			var pageJ = tables.api().row($(this).parents("tr")).remove();
			            			if(currentPageLen == data.number){
			            				pageJ.page('previous').draw(false);
			            			} else {
			            				pageJ.draw(false);
			            			}
			            			tip("成功", "删除成功！！");
			            		} else if (data.number == "0"){
			            			tip("失败", "删除失败");
			            		} else {
			            			tables.api().row($(this).parents("tr")).remove().draw();
			            			tip("提醒", "部分删除, 但" + data.messageTip + "等物业公司无法删除，请登录物业管理平台");
			            		}
		        	},"json");
		            }
		        });
			});
		}
	}
}();