<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% 
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
	pageContext.setAttribute("basePath", basePath);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<base href="${basePath }/"/>
<title>Insert title here</title>
</head>
<body>
	<form id="myForm" action="" method="post">
	    <input type="text" name="name">名字
	    <input type="file" name="file">文件
	    <input type="button" id="ti" value="提交">
	</form>
	<script type="text/javascript" src="static/plugin/jquery/jquery-3.0.0.min.js"></script>
	<script type="text/javascript">
		$(function() {
			$("#ti").click(function() {
				var data = new FormData($("#myForm").get(0));
				$.ajax({
					type: "post", 
					url: "person/upload",
					data: data,
					processData: false,
					contentType: false,
					success: function() {
						console.info("success");
					},
					error: function() {
						console.info("error");
					}
				});
			});
		});
	</script>
</body>
</html>