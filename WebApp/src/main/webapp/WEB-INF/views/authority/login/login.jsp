<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib  prefix = "c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
	pageContext.setAttribute("basePath", basePath);
%>
<!DOCTYPE html>  
<html>  
    <head>  
       	<%@ include file="/WEB-INF/views/commons/meta.jsp" %>
       	<link rel="stylesheet" href="static/plugin/font/css/font-awesome.min.css">
        <link rel="shortcut icon" href="static/custom/img/favicon.ico" />
        <%@ include file="/WEB-INF/views/commons/css.jsp" %>
        <%@ include file="/WEB-INF/views/commons/js.jsp" %>
       	<link rel="stylesheet" href="static/custom/css/login/login.css">
        <script type="text/javascript">
		    //跳出iframe框架
		    if (window != top) {
			   top.location.href = location.href; 
		    }
		</script>
    </head>  
    <body>  
	    <div class="container">  
	        <div class="form row">  
	            <form id="login-form" class="form-horizontal col-sm-offset-3 col-md-offset-3" action="<c:url value="/login"/>" method="POST" >  
	                <h3 class="form-title">Login to your account</h3>
	                <c:if test="${not empty error}">
			            <p id="error-content" style="color:red">${error}</p>
			        </c:if>  
	                <div class="col-sm-9 col-md-9">
	                    <div class="form-group">  
	                        <i class="fa fa-user fa-lg"></i>  
	                        <input class="form-control required" type="text" placeholder="accountName" name="username" autofocus="autofocus" maxlength="20"/>  
	                    </div>  
	                    <div class="form-group">
	                            <i class="fa fa-lock fa-lg"></i>  
	                            <input class="form-control required" value="" autocomplete="off" type="password" id="password" placeholder="Password" name="password" maxlength="8"/>  
	                    </div>  
	                    <div class="form-group">  
	                        <hr />  
	                    </div>  
	                    <div class="form-group">  
	                        <input type="submit" class="btn btn-success pull-right" value="Login" id="btn-submit"/> 
	                    </div>  
	                </div>  
	            </form>  
	        </div>  
        </div>  
    </body>  
</html>  

