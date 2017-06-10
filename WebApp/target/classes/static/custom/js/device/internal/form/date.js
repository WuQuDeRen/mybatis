$(function() {
	// 生产日历
	$('#deviceProduceDate').datetimepicker({
	    minView: "month", //选择日期后，不会再跳转去选择时分秒 
	    //language:  'zh-CN',
	    format: 'yyyy-mm-dd',
	    pickerPosition: 'top-right',
	    todayBtn:  1,
	    autoclose: 1,
	});
	// 出厂日历
	$('#deviceOutFactoryDate').datetimepicker({
		minView: "month", //选择日期后，不会再跳转去选择时分秒 
		//language:  'zh-CN',
		format: 'yyyy-mm-dd',
		pickerPosition: 'top-right',
		todayBtn:  1,
		autoclose: 1,
	});
	// 出厂日历
	$('#device-pro-edit').datetimepicker({
		minView: "month", //选择日期后，不会再跳转去选择时分秒 
		//language:  'zh-CN',
		format: 'yyyy-mm-dd',
		pickerPosition: 'top-right',
		todayBtn:  1,
		autoclose: 1,
	});
	// 出厂日历
	$('#device-out-edit').datetimepicker({
		minView: "month", //选择日期后，不会再跳转去选择时分秒 
		//language:  'zh-CN',
		format: 'yyyy-mm-dd',
		pickerPosition: 'top-right',
		todayBtn:  1,
		autoclose: 1,
	});
	
	
});