package priv.fj.webapp.commons.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

public class CORSFilter extends OncePerRequestFilter{

	/**
	 * 解决跨域：Access-Control-Allow-Origin，值为*表示服务器端允许任意Domain访问请求
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		if (request.getHeader("Access-Control-Request-Method") != null
				&& "OPTIONS".equals(request.getMethod())) {
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.addHeader("Access-Control-Allow-Methods",
					"GET, POST, PUT, DELETE, OPTIONS");
			response.addHeader("Access-Control-Allow-Headers",
					"origin, content-type, accept, x-requested-with, sid, mycustom, smuser, X-CSRF-TOKEN");
			response.addHeader("Access-Control-Max-Age", "1800");// 30 min
		}
		filterChain.doFilter(request, response);
	}
}
