package priv.fj.webapp.dev.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import priv.fj.webapp.dev.domain.person.dto.DeletePerson;
import priv.fj.webapp.dev.domain.person.entity.Person;

@Repository
public interface PersonDao {
	public Person get(@Param("id") Integer id);
	
	public List<Person> getList();
	
	int update(Person person);
	
	int insert(Person person);
	
	int delete(DeletePerson del);
	
}
