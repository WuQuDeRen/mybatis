package priv.fj.webapp.dev.common.mock;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import priv.fj.webapp.dev.common.junit.JUnit4ClassRunner;


@RunWith(JUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:/configruation/spring/spring-main.xml", "classpath*:/configruation/spring/spring-mvc.xml"})
@WebAppConfiguration
public class BaseMockMvc {
	@Autowired
	private WebApplicationContext wac;
	private MockMvc mockMvc;
	
	@Before
	public void setUp() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}
	
	public MockMvc getMockMvc() {
		return mockMvc;
	}
	
}
