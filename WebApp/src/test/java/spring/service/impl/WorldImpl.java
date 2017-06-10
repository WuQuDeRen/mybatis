package spring.service.impl;

import org.springframework.stereotype.Component;

import spring.service.World;
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
@Component("world")
public class WorldImpl implements World
{
	// 定义一个简单方法，模拟应用中的业务逻辑方法
		public void bar()
		{
			System.out.println("执行World组件的bar()方法");
		}
}
