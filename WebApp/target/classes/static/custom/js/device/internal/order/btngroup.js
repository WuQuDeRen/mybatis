//按钮组模态框
$('#btngroup').on('hidden.bs.modal', function () {
	$(".btngroup").removeClass("active");
});
//表格中的按钮
$("#table-parent").on("click", ".btngroup", function() {
	$("div.zIndex").css("z-index", "2000");
	//展示按钮组
	$("#btngroup").modal('show');
	$(this).addClass("active");
	
	var data = $.getDatables().api().row($(".btngroup.active").closest("tr")).data();
});
