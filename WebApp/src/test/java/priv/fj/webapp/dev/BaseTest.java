package priv.fj.webapp.dev;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

import priv.fj.webapp.dev.common.junit.JUnit4ClassRunner;

@RunWith(JUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:/configruation/spring/spring-main.xml", "classpath*:/configruation/spring/spring-mvc.xml"})
//public class BaseTest extends AbstractTransactionalJUnit4SpringContextTests{
public class BaseTest {
}
