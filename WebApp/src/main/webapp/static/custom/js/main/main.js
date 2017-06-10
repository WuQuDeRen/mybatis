$(function() {
	var current = $.formatDate("yyyy-MM-dd hh:mm:ss", new Date().getTime());
	$("#current_time").text(current)
	// 这是为了每过1s显示一次时间
	setInterval(
			function() {
				var current = $.formatDate("yyyy-MM-dd hh:mm:ss", new Date()
						.getTime());
				$("#current_time").text(current)
			}, 1000);
	$('[data-submenu]').submenupicker();
	$('#menu').metisMenu();
});
$(function() {
	$("#person-info").click(function() {
		var href = $(this).attr("data-href");
		//只有最底层的<a>才会有data-href属性
		if (typeof(href) != "undefined") {
			//喜爱那个服务器发送请求请求对应页面
			$("#load-page").attr("src", $("base").attr("href") + href);
			$("#title-header").text($.trim($(this).text()));
			//更新面包屑导航信息
			$("#breadcrumb").empty();
			var aArray = $(this).parentsUntil("#menu", "li").children("a").get();
			for(i =  aArray.length-1; i >= 0; i --) {
			    $("#breadcrumb").append(
			    	'<li> <a href="javascript:void(0);">' + $.trim($(aArray[i]).text()) + '</a></li>' 
			    ); 
			}
			$("#breadcrumb").children("li").first().prepend('<span class="glyphicon glyphicon-home" style="color: #0C0C0C;"></span>&nbsp;&nbsp;');
		}
	});
	//
	$('#page-sidebar').on('show.bs.collapse', function() {});
	//更新内容区信息
	$(".left-sidebar a").click(function() {
		//给被激活的a标签设置active类
		$("a.active").removeClass("active");
		$(this).addClass("active");
		
		var href = $(this).attr("data-href");
		//只有最底层的<a>才会有data-href属性
		if (typeof(href) != "undefined") {
			//喜爱那个服务器发送请求请求对应页面
			$("#load-page").attr("src", $("base").attr("href") + href);
			$("#title-header").text($.trim($(this).text()));
			//更新面包屑导航信息
			$("#breadcrumb").empty();
			var aArray = $(this).parentsUntil("#menu", "li").children("a").get();
			for(i =  aArray.length-1; i >= 0; i --) {
			    $("#breadcrumb").append(
			    	'<li> <a href="javascript:void(0);">' + $.trim($(aArray[i]).text()) + '</a></li>' 
			    ); 
			}
			$("#breadcrumb").children("li").first().prepend('<span class="glyphicon glyphicon-home" style="color: #0C0C0C;"></span>&nbsp;&nbsp;');
		}
	});
});