package priv.fj.webapp.authority.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import priv.fj.webapp.authority.dao.UserDao;
import priv.fj.webapp.authority.domain.admin.entity.User;
import priv.fj.webapp.authority.domain.role.dto.JWTUserDetails;
import priv.fj.webapp.authority.domain.role.entity.Role;

/**
 * 提供认证所需的用户信息    在此项目总并未使用
 *
 * @author ybin
 * @since 2017-03-08
 */
public class UserDetailsServiceCustom implements UserDetailsService {

	protected final Log logger = LogFactory.getLog(this.getClass());
	@Autowired
	private UserDao userRepository;

	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
        //
		User user = userRepository.findByUsername(username);
		if (user == null) {
			logger.debug("can not find user: " + username);
			throw new UsernameNotFoundException("can not find user.");
		}
		//
		long userId = Long.valueOf(user.getId());
		String password = user.getPassword();
		boolean enabled = true;
		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNonLocked = true;
		List<GrantedAuthority> authorities = new ArrayList<>();
		List<Role> roles = user.getRoles();
		for (Role role : roles) {
			authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
		}
		UserDetails userDetails = new JWTUserDetails(userId, username,
				password, enabled, accountNonExpired, credentialsNonExpired,
				accountNonLocked, authorities);

		return userDetails;
	}
}
