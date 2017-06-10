//添加管理员弹窗
$("#btn-add").on("click", function() {
	$("#form-add")[0].reset();
	//生成11位的供挑选账号
	var referenceAccountName = '';
	var str = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','g','k','l','m','n','o','p','q','r','s'
	           ,'t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    for (i=0;i<11;i++) {
    	referenceAccountName += str[Math.floor(Math.random()*(str.length))];
    }
    $("#name-add").val($.trim(referenceAccountName));
    
    $("#sales-id").empty();
    $("#sale-id option").clone().appendTo($("#sales-id"));
    $("#sales-id").val( $("#sale-id").val());
    
	$.post("table/role/all-role",function(data) {
		$("#select-role").empty();
		for (index in data) {
			var current = data[index];
			if (current.roleId == "1") {
				continue;
			}
			$("#select-role").append(
		    		'<label class="checkbox-inline">'
				    + '<input type="checkbox" name="roleId" value="'+ current["roleId"] +'">'
		    		+ current["roleDesc"]
				    +'</label>'		
		    );
			if (index == 0) {
				$("#select-role label:first").css("margin-left", 10);
			}
		}
	    
	}, "json");
	$('#myModal').modal({
		keyboard : true
	});
});

//提交添加管理员信息
$("#add-estate").on("click",function() {
	if (!$("#form-add").valid()) {
		return;
	}
	$.ajax({
		type: "post",
		url: "table/admin/add-admin",
		dataType: "json",
		beforeSend: function() {
			$("#form-add").attr("disabled", "disabled");
		},
		data: $("#form-add").serialize(),
		success: function(data) {
			if (data.result == "success") {
				/*$('#myModal').modal('hide');*/
				$.getDatables().fnDraw(false);
				tipSuccess("添加成功");
			} else {
				tipWarn("添加失败(可能是由于管理员已被添加)");
			}
		},
		complete: function() {
			$("#form-add").removeAttr("disabled");
		}
			
	});
});