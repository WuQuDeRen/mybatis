package priv.fj.test;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.junit.Test;

import com.alibaba.fastjson.JSONObject;

public class T {
	

	@Test
	public void test() throws ClassNotFoundException, UnsupportedEncodingException {
		int i = Integer.valueOf(null).intValue();
		System.out.println(i);
		List<String> lists = new ArrayList<String>();
		lists.add("a");
		lists.add("b");
		lists.add("c");
		Iterator<String> iterator = lists.iterator();
		while (iterator.hasNext()) {
			String s = iterator.next();
			if ("b".equalsIgnoreCase(s)) {
				iterator.remove();
			}
		}
		System.out.println(lists);
	}

}
