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
					var data = $.getDatables().api().row($(".btngroup.active").closest("tr")).data();
					var str;
					if (data && (data.version == val.targetVersion)) {
						str = "<option disabled='disabled' selected='selected' value='" + val.targetVersion + "'>" + val.targetVersion + "</option>";
					} else {
						str = "<option value='" + val.targetVersion + "'>" + val.targetVersion + "</option>";
					}
					$("#upgrade-version").append(str);
				});
				
			}
		});
	});
});
