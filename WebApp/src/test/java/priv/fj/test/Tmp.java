package priv.fj.test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.commons.io.FileUtils;
import org.junit.Test;
import org.springframework.web.multipart.MultipartFile;

public class Tmp {
	@Test
	public void test() {
//		File file = new File("."+File.separator+"bbddo"+File.separator+"ddtd");
		File file = new File("bbdldo"+File.separator+"ddtd");
		String path = Thread.currentThread().getContextClassLoader().getResource("").getPath();
		System.out.println(path);
		if (!file.exists()) {
			boolean flag = file.mkdirs();
			System.out.println(file.getAbsolutePath());
		}
	}
	
	@Test
	public void test2() throws IOException{
	}
}
