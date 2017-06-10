package priv.fj.test.test;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.junit.Test;

public class Cglib {

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
