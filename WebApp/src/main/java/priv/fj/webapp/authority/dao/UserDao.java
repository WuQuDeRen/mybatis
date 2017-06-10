package priv.fj.webapp.authority.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import priv.fj.webapp.authority.domain.admin.entity.User;

@Repository
public interface UserDao {
    User findByUsername(@Param("username") String username);
    List<User> findAll();
    User insert(User user);
    User findOne(String id);
    User save(User user);
    User delete(String id);
}
