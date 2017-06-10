package priv.fj.webapp.commons.mybatis.plugin;

import java.sql.Connection;
import java.util.Properties;

import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;

@Intercepts(value = { @Signature(type = StatementHandler.class, method = "prepare", args = {Connection.class, Integer.class}) })
public class MyPlugin4 implements Interceptor {

	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		// TODO Auto-generated method stub
		System.out.println("before");
		StatementHandler s = (StatementHandler) invocation.getTarget();
		MetaObject metaObj = SystemMetaObject.forObject(s);
		while(metaObj.hasGetter("h")) {
			Object obj = metaObj.getValue("h");
			metaObj =  SystemMetaObject.forObject(obj);
			if (metaObj.hasGetter("target")) {
				obj = metaObj.getValue("target");
				metaObj = SystemMetaObject.forObject(obj);
			}   
		}
		Object obj = invocation.proceed();
		System.out.println("after");
		return obj;
	}

	@Override
	public Object plugin(Object target) {
		// TODO Auto-generated method stub
		System.err.println("before");
		Object obj = Plugin.wrap(target, this);
		System.out.println(obj.getClass().getName());
		System.err.println("after");
		return obj;
	}

	@Override
	public void setProperties(Properties properties) {
		// TODO Auto-generated method stub
	}

}
