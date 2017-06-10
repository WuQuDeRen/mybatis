package priv.fj.webapp.authority.service;

import priv.fj.webapp.authority.domain.admin.entity.User;


public interface AuthService {
    User register(User userToAdd);
    String login(String username, String password);
    String refresh(String oldToken);
}
