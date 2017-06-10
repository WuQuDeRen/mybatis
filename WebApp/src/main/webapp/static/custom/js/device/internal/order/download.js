	//进度条
    function progressbar(percentage, $td, deviceName) {
    	if (typeof percentage == 'number') {
    		$td.find('.progress .progress-bar').attr('data-transitiongoal', percentage).progressbar(
    	    		{display_text: 'center'}
    		);
    		if (percentage == 100) {
        		if (deviceName) {
        		   tipSuccess("设备：" + deviceName + " 更新成功", $td);
        		}
        		$td.prevAll("td").last().find("input").prop("checked", false);
        	}
    	}
    	if (typeof percentage == 'string') {
    		if (percentage == 'success') {
    			$td.html("更新完成");
        	}
    		if (percentage == 'fail') {
    			$td.html("更新失败");
    		}
    		setTimeout(function() {
				$td.removeAttr("disabled");
				$td.removeClass("btn-warning");
				$td.addClass("btn-success");
				$td.html("再次更新");
			}, 1000);
    	}
    }    
    //进度条
    function progressbarBatch(percentage, $td, deviceName) {
    	if (typeof percentage == 'number') {
    		$td.find('.progress .progress-bar').attr('data-transitiongoal', percentage).progressbar(
    	    		{display_text: 'center'}
    		);
    		if (percentage == 100) {
        		if (deviceName) {
        		   tipSuccess("设备：" + deviceName + " 更新成功", $td);
        		}
        		$td.prevAll("td").last().find("input").prop("checked", false);
        	}
    	}
    	if (typeof percentage == 'string') {
    		if (percentage == 'success') {
    			$td.children("span").text("完成");
        	}
    		if (percentage == 'fail') {
    			$td.find('.progress').text("更新失败");
    		}
    		setTimeout(function() {
				$td.children("span").css("display", "none");
				$td.find("input").css("display", "inline-block");
				$("input:checked").prop("checked", false);
			}, 1600);
    	}
    	
    }  
    //---------------单个设备更新程序--------------------
    //更新设备状态进度条
    var ajaxStataus = function(param, timer, deviceName, $td) {
    	$.ajax({                              //向中心平台发送查询设备更新状态
    		type: 'POST',
    		url: 'table/dev/internal/progress',
    		contentType: "application/json;charset=UTF-8",
    		dataType: "json",
    		data: JSON.stringify(param),
    		success: function(rvt) {
    			var data = rvt.data;
    			var result = rvt.result;
    			if (result == 'success') {
    				for (index in data) {
    					progressbar(data[index], $td, deviceName);  //进度条刷新
    					if (typeof data[index] == 'string') {
							if (data[index] == 'success') {
								clearInterval(timer);  //解除定时器
							}
    					}
    					if (typeof data[index] == 'number') {
    						if (data[index] == 100) {  //下载状态完成
                				clearInterval(timer);  //解除定时器
                			}
    					}
    				}
    			}
    		},
    		error: function() {
    			tipWarn("设备更新状态出现异常！！！");
    			clearInterval(timer);
    			$td.html("更新失败");
    			setTimeout(function() {
    				$td.removeAttr("disabled");
    				$td.removeClass("btn-warning");
    				$td.addClass("btn-success");
    				$td.html("再次更新");
    			}, 1000);
    		}
    	});
    }
    
    //推送软件下载地址
    var updateDeviceSingle = function(param, deviceName, $td) {
    	$.ajax({                              //向中心平台发送设备标识和升级程序下载URL
    		type: 'POST',
    		url: 'table/dev/internal/software',
    		contentType: "application/json;charset=UTF-8",
    		dataType: "json",
    		data: JSON.stringify(param),
    		success: function(rvt) {
    			var result = rvt.result;
    			if (result == 'success') {
    				//定时器
    		    	var timer = setInterval(function() {
    		        	ajaxStataus(param, timer, deviceName, $td); //发送状态请求状态
    		    	}, 1000);
    			}
    		},
    		error: function(e, xhr) {
    			tipSuccess("请求设备更新出现异常！！！");
    		}
    	});
    }
    
    //选择单独设备
    $("#download").on("click", function() {
    	$parent = $(".btngroup.active").closest("tr")
    	var data = $.getDatables().api().row($(".btngroup.active").closest("tr")).data();
    	var param = {
    		downloadUrl: 'table/dev/status',
    		deviceName: [data['deviceName']]
    	};
    	var $td = $(this);
    	$td.attr("disabled", "disabled");
    	$td.removeClass("btn-success");
    	$td.addClass("btn-warning");
    	/*$td.html(
    			'<div class="progress  progress-striped active">'
    			 +' <div class="progress-bar progress-bar-danger six-sec-ease-in-out" role="progressbar"></div>'
    			+'</div>'
    	);*/
    	/*$td.html(
    			'<div class="progress  progress-striped active">'
    			 +' 下载中'
    			+'</div>'
    	);*/
    	$td.html("下载中");
    	//进度条刷新
    	//progressbar(0, $td);
    	
    	updateDeviceSingle(param, data.deviceName, $td);
    });
    
   //------------------设备更新批量操作-------------------------
    
    //批量更新设备状态进度条
    var ajaxStatausBatch = function(params, timer) {
    	var mark = [];
    	for (index in params.deviceName) {
    		mark.push(params.deviceName[index].deviceName);
    	}
    	var param = {
    			downloadURL: 'table/dev/status',
        		deviceName: mark
        };
    	$.ajax({                              //向中心平台请求设备更新状态
    		type: 'POST',
    		url: 'table/dev/internal/progress',
    		contentType: "application/json;charset=UTF-8",
    		dataType: "json",
    		data: JSON.stringify(param),
    		success: function(rvt) {
    			var data = rvt.data;
    			var result = rvt.result;
    			if (result == 'success') {
    				var count = 0;
    				for (index in data) {  //index设备名
    					var deviceNames = params.deviceName;
    					for (j in deviceNames) {
    						var currentDev = deviceNames[j];
    						if (currentDev.deviceName == index) {
    							progressbarBatch(data[index], currentDev.$td, currentDev.deviceName);  //进度条刷新
    							if (typeof data[index] == 'number') {
    								if (data[index] == 100) {
        								count++;
        							}
    							}
    							if (typeof data[index] == 'string') {
    								if (data[index] == 'success') {
        								count++;
        							}
    							}
    						}
    					}
    				}
    				if (count == Object.getOwnPropertyNames(data).length) {
    					clearInterval(timer);  //解除定时器
    				}
    			}
    		},
    		error: function(xhr) {
    			tipWarn("更新状态出现异常！！！");
    			clearInterval(timer);
    		}
    	});
    }
    //推送下载地址
    function updateDeviceBatch(params) {
    	var mark = [];
    	for (index in params.deviceName) {
    		mark.push(params.deviceName[index].deviceName);
    	}
    	var param = {
    			downloadURL: 'table/dev/status',
        		deviceName: mark
        };
    	$.ajax({                              //向中心平台发送设备标识和升级程序下载URL
    		type: 'POST',
    		url: 'table/dev/internal/software',
    		contentType: "application/json;charset=UTF-8",
    		dataType: "json",
    		data: JSON.stringify(param),
    		success: function(rvt) {
    			var result = rvt.result;
    			if (result == 'success') {
    				//定时器
    		    	var timer = setInterval(function() {
    		        	ajaxStatausBatch(params, timer); //发送状态请求状态
    		    	}, 1000);
    			}
    		},
    		error: function(e, xhr) {
    			tipSuccess("请求设备更新出现异常！！！");
    		}
    	});
    }
    //批量设备选择
    function select() {
    	var mark = [];
    	var $input = $("input[name='checkList']:checked");
    	$input.each(function(index) {
    		var currentTd = $(tables.api().row($(this).parents("tr")).node()).find("td:first");
    		/*currentTd.html(
        			'<div class="progress  progress-striped active">'
    				+' 下载中'
        			+'</div>'
        	);*/
    		currentTd.children("input").css("display", "none");
    		currentTd.append("<span style='font-weight: bold;'>下载中</span>");
/*    		currentTd.html(
    				'<div class="progress  progress-striped active">'
    				+' <div class="progress-bar progress-bar-danger six-sec-ease-in-out" role="progressbar"></div>'
    				+'</div>'
    		);
*/    		//进度条刷新
        	//progressbar(0, currentTd);
    		var tmpData = tables.api().row(index).data();
    		var tmpParam = {
    			deviceName: tmpData.deviceName,
    			$td : currentTd
    		};
    		mark.push(tmpParam);
    	});
        if ($input.length < 1) {
        	tipWarn("至少选择一个设备用于更新");
        	return;
        }
    	var param = {
			downloadURL: 'table/dev/status',
    		deviceName: mark
    	};
    	updateDeviceBatch(param);
    }
    
    //多选更新事件绑定
    $("#btn-upload").on("click", select);
    
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