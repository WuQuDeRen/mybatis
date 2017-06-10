package spring;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import spring.controller.TestController2;
import spring.controller.TestController3;
import spring.service.Hello;
import spring.service.World;

/**
 * Description: <br/>
 * ��վ: <a href="http://www.crazyit.org">���Java����</a> <br/>
 * Copyright (C), 2001-2016, Yeeku.H.Lee <br/>
 * This program is protected by copyright laws. <br/>
 * Program Name: <br/>
 * Date:
 * 
 * @author Yeeku.H.Lee kongyeeku@163.com
 * @version 1.0
 */
public class BeanTest {
	@Test
	public void test() {
		// 创建Spring容器
		ApplicationContext parent = new ClassPathXmlApplicationContext("beans.xml");
		ApplicationContext ctx = new ClassPathXmlApplicationContext("beanscontroller.xml");
		((ClassPathXmlApplicationContext) ctx).setParent(parent);
		((ClassPathXmlApplicationContext) ctx).refresh();
		Hello hello = ctx.getBean("hello", Hello.class);
		hello.foo();
		System.out.println("addUser()的返回值为：" + hello.addUser("孙悟空", "7788"));
		World world = ctx.getBean("world", World.class);
		world.bar();
		TestController2 tc = ctx.getBean("testController2", TestController2.class);
		tc.print();
		TestController3 tc3 = ctx.getBean("testController3", TestController3.class);
		tc3.print();
	}
}