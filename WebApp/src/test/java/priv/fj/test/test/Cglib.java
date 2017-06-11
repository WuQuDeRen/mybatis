package priv.fj.test.test;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.codec.binary.Base64;
import org.junit.Test;

import com.fasterxml.jackson.databind.deser.Deserializers.Base;

public class Cglib {

	@Test
	public void testbase() {
		String h = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiY3JlYXRlZCI6MTQ5NzE2Nzk4NzEwNCwiZXhwIjoxNDk3NzcyNzg3fQ.3EwG2qTO0iN6UTmwJvkZBvvXE9LKhgC3ze2nELIOK9DI99jpe00izyu4kvaAQzN556KDTTeTHzxinROcJPlUSg";
		byte[] s = Base64.decodeBase64(h);
		String re = new String(s);
		System.out.println(re);
	}
	
	
	@Test
	public void test() {
		
		System.out.println(System.currentTimeMillis() + 2000000);
		List<String> s = new ArrayList<String>();
		s.add("a");
		s.add("b");
		Iterator<String> iter = s.iterator();
		while (iter.hasNext()) {
			String current = iter.next();
			System.out.println(current);
		}
	}
	
	@Test
	public void testUl() throws UnsupportedEncodingException {
		System.out.println(URLEncoder.encode("\"\"", "utf-8"));
		String id = "123124";
		String s = "http://192.168.2.1:3306/xcap-root/resource-lists/users/" + id + "/devInfo/~~/device%5B@id=%22" + id + "%22%5D";
		String rvt = URLDecoder.decode(s, "utf-8");
		System.out.println(rvt);
	}

}
