package priv.fj.webapp.dev.dao;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.testng.Assert;

import priv.fj.webapp.dev.BaseTest;
import priv.fj.webapp.dev.domain.person.dto.DeletePerson;
import priv.fj.webapp.dev.domain.person.entity.Person;

import com.github.pagehelper.PageHelper;

public class PersonDaoTest extends BaseTest {
	@Autowired
	private  PersonDao personDao;
	@Autowired  //  注入上下文  
    private ApplicationContext context; 
	@Value("test")
	private String value;
	/*bean id="configProperties" class="org.springframework.beans.factory.config.PropertiesFactoryBean">
	    <property name="locations">
	        <list>
	            <value>classpath:/configruation/info.properties</value>
	        </list>
	    </property>
    </bean>	*/
	/*@Value("#{configProperties['infoo.a']}")
	public String infoA;*/
	
	//<context:property-placeholder ignore-unresolvable="true"  location="classpath*:/configruation/config.properties" />
	@Value("${jdbc.username}")
	private String name;
	@Value("${jwt.header}")
	private String header;
	
	@Test
	public void testGet() throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException {
		Person person = personDao.get(1);
		Assert.assertNotNull(person);
	}
	@Test
	public void testGetList() {
		PageHelper.startPage(6, 2);
		List<Person> persons = personDao.getList();
		for (Person person : persons) {
			System.out.println(person);
		}
	}
	//@Transactional
	@Test
	public void testUpdate() {
		Person person = new Person(1, "feiji", "12");
		int count = personDao.update(person);
		Assert.assertEquals(count, 1);
	}
	
	@Test
	public void testDelete() {
		DeletePerson del = new DeletePerson();
		List<Integer> ids = new ArrayList<Integer>();
		ids.add(1);
		ids.add(2);
		ids.add(3);
		del.setIds(ids);
		int count = personDao.delete(del);
		Assert.assertEquals(count, 3);
	}
}
