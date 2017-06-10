function getSales() {
	$.get("table/sales/all-sales", function(data) {
		$("#sale-id option:gt(0)").remove();
		for(index in data) {
			var property = data[index];
			$("#sale-id").append(
				'<option value="' + property["salesId"] + '">' + property["salesComName"] + '</option>');
		}
	}, "json");
}