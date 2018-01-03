package priv.fj.webapp.authority.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/account")
public class LoginController {
	private static final String LOGIN_JSP = "/authority/login/login";
	@RequestMapping(value = "/login")
	public String login() {
		return LOGIN_JSP;
	}
	
	@RequestMapping(value = "/test")
	@ResponseBody
	public String test() {
		Authentication au = SecurityContextHolder.getContext().getAuthentication();
	    System.out.println(au.getAuthorities());
		return "test";
	}
}
