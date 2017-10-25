package priv.fj.webapp.authority.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import priv.fj.webapp.authority.domain.admin.entity.User;
import priv.fj.webapp.authority.domain.role.entity.Role;

public final class JwtUserFactory {

    private JwtUserFactory() {
    }

    public static JwtUser create(User user) {
        return new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                mapToGrantedAuthorities(user.getRoles()),
                user.getLastPasswordResetDate()
        );
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(List<Role> roles) {
    	List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
    	for (Role role : roles) {
    		GrantedAuthority authority = new SimpleGrantedAuthority(role.getRoleName());
    		authorities.add(authority);
    	}
    	return authorities;
    }
}

