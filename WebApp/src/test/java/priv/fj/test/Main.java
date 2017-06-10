package priv.fj.test;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;

import org.junit.Test;



public class Main {
	
	@Test
	public void test() throws FileNotFoundException {
		File source = new File("");
		FileReader reader = new FileReader(source);
		//FileCopyUtils.copy(in, out)
	}
	@Test
	public void testFile() {
		System.out.println(System.getProperty("file.separator"));
	}
	
}