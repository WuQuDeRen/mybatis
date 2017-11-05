package priv.fj.test;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.UnsupportedEncodingException;
import java.util.Base64;

import org.junit.Test;



public class Main {
	
	@Test
	public void test() throws FileNotFoundException {
		File source = new File("");
		FileReader reader = new FileReader(source);
		//FileCopyUtils.copy(in, out)
	}
	@Test
	public void testFile() throws UnsupportedEncodingException {
		String de = "eyJzdWIiOiIxIiwicm9sZSI6WyJST0xFX1VTRVIiLCJST0xFX0FETUlOIiwiUk9MRV9TVVBFUiJdLCJjcmVhdGVkIjoxNTAwMTM2MzE1NTk2LCJleHAiOjE1MDA3NDExMTV9";
		String s = new String(Base64.getDecoder().decode(de), "utf-8");
		System.out.println(s);
	}
	
}