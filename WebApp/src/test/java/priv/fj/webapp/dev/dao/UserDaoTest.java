package priv.fj.webapp.dev.dao;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import priv.fj.webapp.authority.dao.UserDao;
import priv.fj.webapp.authority.domain.admin.entity.User;
import priv.fj.webapp.dev.BaseTest;

public class UserDaoTest extends BaseTest{
	@Autowired
    private UserDao userRepository;
	
	@Test
	public void testGetByName() {
		User user = userRepository.findByUsername("1");
		System.out.println(user);
	}
}
