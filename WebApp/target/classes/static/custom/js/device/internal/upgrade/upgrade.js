
	var viewHandler = function(map, val, result) {
		$.each(map.name$tr, function(ind, current) {
			if (current.deviceName == val.deviceName) {
				var $tr = current.$tr;
			    $tr.find("td:first").prepend("<span class='tip'  style='font-weight: bold;text-decoration: blink;z-index:9000;left: 30%'>" + result + "</span>");
			    $tr.find("input[name='checkList']").css("display", "none");
			    var delay = 500;
			    if (map.name$tr.length) {
			    	delay = 1500;
			    }
			    setTimeout(function() {
					$tr.find("td:first").find('.tip').remove();
					$tr.find("input[name='checkList']").css("display", "inline");
				}, delay);
				return false;
			}
		});
	}
	var paramHandler = function($tr, option, upType, targetVersion) {
		var deviceName = {dstInfo: []};
		var map = {name$tr: []};
		$.each($tr, function(index, val) {
			var data = tables.api().row(val).data();
			deviceName.dstInfo.push({deviceName: data.deviceName});
			map.name$tr.push({deviceName: data.deviceName, $tr: $(val)});
		});
		var param = {
		        src: "dm",
			dstType: "intD",
			dstInfo: deviceName.dstInfo,
			msg: {
				op: option
			},
			versionDetail: {
				upgradeType: upType,
				targetVersion: targetVersion
			}
		}
		$.upgradeDevPost("apk/upgrade", param, function(data) {
			$.each(data, function(index, val) {
				if (val.result == "success") {
					var result = "成功";
					viewHandler(map, val, result);
				} else {
					var result = "失败";
					viewHandler(map, val, result);
				}
			});
		}, "json");
	}
	$("#upgrade-submit").on("click", function() {
		var op = "qUpdate";
		$tr = $("#dataTable .btngroup.active").closest("tr");
		var $dialog = $(this).closest(".modal-dialog");
		var upType = $dialog.find("input:checked").val();
		var targetVersion = $dialog.find("select[name='version']").val();
		if (!targetVersion) {
			tipWarn("请选择版本");
			return;
		}
		var param = paramHandler($tr, op, upType, targetVersion);
		$("#upgrade-modal").modal('hide');
	});
	var batchList = function() {
		$("#batchUpgrade").modal('show');
		$.ajax({
			type: "get",
			url: "apk/version",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			success: function(data) {
				$("#upgrade-batch-version option:not(:first)").remove();
				$.each(data, function(index, val) {
					var str = "<option value='" + val.targetVersion + "'>" + val.targetVersion + "</option>";
					$("#upgrade-batch-version").append(str);
				});
			}
		});
	}
	
	$("#btn-upload").on("click", function() {
		var op = "qUpdate";
		var $tr = $("input[name='checkList']:checked").closest("tr");
		if (!$tr.length) {
			tipWarn("至少勾选一个");
			return;
		}
		batchList();
		$("#batch-upgrade-submit").click("click", function() {
			var $dialog = $(this).closest(".modal-dialog");
			var upType = $dialog.find("input:checked").val();
			var targetVersion = $dialog.find("select[name='version']").val();
			if (!targetVersion) {
				tipWarn("请选择版本");
				return;
			}
			$("#batchUpgrade").modal('hide');
			var param = paramHandler($tr, op, upType, targetVersion);
		});
	});
	
