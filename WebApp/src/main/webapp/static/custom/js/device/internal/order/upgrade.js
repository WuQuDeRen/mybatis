$(function() {
	$("#upgrade").on("click", function() {
		$("#upgrade-modal").modal('show');
		$.ajax({
			type: "get",
			url: "apk/version",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			success: function(data) {
				$("#upgrade-version option:not(:first)").remove();
				$.each(data, function(index, val) {
					var str = "<option value='" + val.apkId + "'>" + val.targetVersion + "</option>";
					$("#upgrade-version").append(str);
				});
				
			}
		});
	});
});
