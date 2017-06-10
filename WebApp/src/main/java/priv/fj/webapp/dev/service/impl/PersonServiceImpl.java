package priv.fj.webapp.dev.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import priv.fj.webapp.dev.dao.PersonDao;
import priv.fj.webapp.dev.domain.person.entity.Person;
import priv.fj.webapp.dev.service.PersonServiceI;

@Service("personServiceImpl")
public class PersonServiceImpl implements PersonServiceI {
	@Autowired
	private PersonDao personDao;

	@Override
	public Person getPersonById(Integer id) {
		// TODO Auto-generated method stub
	
		return this.personDao.get(id);
	}

}
