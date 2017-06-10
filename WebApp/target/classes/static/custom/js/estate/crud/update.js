$(function() {

	//----------------修改物业公司信息------------------

	//修改物业信息
	//$("#dataTable").on("click", ".edit-row", function() {
	$("#editRow").on("click", function() {
		//隐藏按钮组
		$("#btngroup").modal('hide');
		$("#form-edit").data('validator').resetForm();
		console.dir($(".btngroup.active"));
		var data = $.getDatables().api().row($(".btngroup.active").closest("tr")).data();
		$("#name-edit").val(data.companyName);
		$("#person-edit").val(data.contactName);
		$("#num-edit").val(data.contactNum);
		$("#email-edit").val(data.email);
		$("#address-edit").val(data.address);
		$("#desc-edit").text(data.companyDes);
		$("#companyId-edit").val(data.companyId);
	    if ($("#select-sale-edit").length) {
	    	$.get("table/sales/all-sales", function(data, textStatus, jqXHR) {
	    		$("#select-sale-edit option:gt(0)").remove();
	    		for(index in data) {
	    			var property = data[index];
	    			$("#select-sale-edit").append(
	    				'<option value="' + property["salesId"] +
	    				'">' + property["salesComName"] +
	    				'</option>');
	    		}
	    	}, "json");
	    }
		$('#myModal-edit').modal({
			keyboard: true
		});

	});

	//修改物业公司信息
	$("#edit-estate").on("click", function() {
		if(check("edit")) {
			var $sale_edit = $("#select-sale-edit");
			if($sale_edit.length > 0) {
				var saleId = $.trim($("#select-sale-edit").val());
				if(saleId == "pick" || saleId == "") {
					tipWarn("请选择经销商!!!");
					return;
				}
			}
			$.ajax({
				type: "POST",
				url: "table/company/update-company",
				dataType: "json",
				data: $("#form-edit").serialize(),
				beforeSend: function() {
					//$("#edit-estate").attr("disabled", "disabled");
				},
				success: function(data) {
					if(data.result == "success") {
						tipSuccess("修改成功！！！");
						tables.api().draw(false);
						$("#myModal-edit").modal('hide');
					} else {
						tipWarn("修改失败！！！");
					}
				},
				error: function() {
					
				},
				complete: function(){
					//$("#edit-estate").removeAttr("disabled");
				}
			});
		}
	});
});