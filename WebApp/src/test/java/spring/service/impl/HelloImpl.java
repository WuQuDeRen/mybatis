package spring.service.impl;

import org.springframework.stereotype.Component;

import spring.service.Hello;
/**
 * Description:
 * <br/>��վ: <a href="http://www.crazyit.org">���Java����</a>
 * <br/>Copyright (C), 2001-2016, Yeeku.H.Lee
 * <br/>This program is protected by copyright laws.
 * <br/>Program Name:
 * <br/>Date:
 * @author Yeeku.H.Lee kongyeeku@163.com
 * @version 1.0
 */
@Component("hello")
public class HelloImpl implements Hello
{
	// 定义一个简单方法，模拟应用中的业务逻辑方法
		public void foo()
		{
			System.out.println("执行Hello组件的foo()方法");
		}
		// 定义一个addUser()方法，模拟应用中的添加用户的方法
		public int addUser(String name , String pass)
		{
			System.out.println("执行Hello组件的addUser添加用户：" + name);
			return 20;
		}
}
