package spring.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;

/**
 * Description:
 * <br/>��վ: <a href="http://www.crazyit.org">���Java����</a>
 * <br/>Copyright (C), 2001-2016, Yeeku.H.Lee
 * <br/>This program is protected by copyright laws.
 * <br/>Program Name:
 * <br/>Date:
 * @author  Yeeku.H.Lee kongyeeku@163.com
 * @version  1.0
 */
// ����һ������
@Aspect
public class TxAspect
{
	// ƥ��org.crazyit.app.service.impl����������ġ�
	// ���з�����ִ����Ϊ�����
	@Around("execution(* spring.service.impl.*.*(..))")
	public Object processTx(ProceedingJoinPoint jp)
		throws java.lang.Throwable
	{
		System.out.println(jp.getTarget().getClass().getName());
		System.out.println("--------------------");
		System.out.println("执行目标方法之前，模拟开始事务...");
		// 获取目标方法原始的调用参数
		Object[] args = jp.getArgs();
		if(args != null && args.length > 1)
		{
			// 修改目标方法的第一个参数
			args[0] = "【增加的前缀】" + args[0];
		}
		// 以改变后的参数去执行目标方法，并保存目标方法执行后的返回值
		Object rvt = jp.proceed(args);
		System.out.println("执行目标方法之后，模拟结束事务...");
		// 如果rvt的类型是Integer，将rvt改为它的平方
		if(rvt != null && rvt instanceof Integer)
			rvt = (Integer)rvt * (Integer)rvt;
		return rvt;
	}
	
	@Around("execution(* spring.controller.*2.*(..))")
	public Object processTxs(ProceedingJoinPoint jp)
		throws java.lang.Throwable
	{
		System.out.println("执行目标方法之前，模拟开始事务...");
		// 获取目标方法原始的调用参数
		Object[] args = jp.getArgs();
		if(args != null && args.length > 1)
		{
			// 修改目标方法的第一个参数
			args[0] = "【增加的前缀】" + args[0];
		}
		// 以改变后的参数去执行目标方法，并保存目标方法执行后的返回值
		Object rvt = jp.proceed(args);
		System.out.println("执行目标方法之后，模拟结束事务...");
		// 如果rvt的类型是Integer，将rvt改为它的平方
		if(rvt != null && rvt instanceof Integer)
			rvt = (Integer)rvt * (Integer)rvt;
		return rvt;
	}
}