package priv.fj.webapp.authority.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/account")
public class LoginController {
	private static final String LOGIN_JSP = "/authority/login/login";
	@RequestMapping(value = "/login")
	public String login() {
		return LOGIN_JSP;
	}
	
}
