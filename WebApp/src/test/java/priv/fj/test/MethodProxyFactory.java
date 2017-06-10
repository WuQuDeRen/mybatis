package priv.fj.test;

import java.lang.reflect.Proxy;

public class MethodProxyFactory {
    @SuppressWarnings("unchecked")
	public static <T> T newInstance(Class<T> methodInterface) {
        final MethodProxy<T> methodProxy = new MethodProxy<T>(methodInterface);
        
        return (T) Proxy.newProxyInstance(Thread.currentThread().getContextClassLoader(), 
                new Class[]{methodInterface}, methodProxy);
    }
}