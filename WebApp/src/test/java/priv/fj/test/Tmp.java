package priv.fj.test;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

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
		// File file = new
		// File("."+File.separator+"bbddo"+File.separator+"ddtd");
		File file = new File("bbdldo" + File.separator + "ddtd");
		String path = Thread.currentThread().getContextClassLoader()
				.getResource("").getPath();
		System.out.println(path);
		if (!file.exists()) {
			boolean flag = file.mkdirs();
			System.out.println(file.getAbsolutePath());
		}
	}

	@Test
	public void test2() throws IOException {
		String token1 = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwicm9sZSI6WyJST0xFX1VTRVIiLCJST0xFX0FETUlOIiwiUk9MRV9TVVBFUiJdLCJjcmVhdGVkIjoxNTAwMjE5NDIyOTc4LCJleHAiOjE1MDA4MjQyMjJ9.EzIUR3oesb3HHcJovVucFuVt3tZVJSPCJsBa16h_dA7nTtg40T9NwLZeEh1tu93jHX9hsaNSCqcp_vjczNC-3A";
		String token = "eyJhbGciOpJIUzUxMiJ9.eyJzdWIiOiIxIiwicm9sZSI6WyJST0xFX1VTRVIiLCJST0xFX0FETUlOIiwiUk9MRV9TVVBFUiJdLCJjcmVhdGVkIjoxNTAwMjE5NDIyOTc4LCJleHAiOjE1MDA4MjQyMjJ9.EzIUR3oesb3HHcJovVucFuVt3tZVJSPCJsBa16h_dA7nTtg40T9NwLZeEh1tu93jHX9hsaNSCqcp_vjczNC-3A";
		String secret = "mySecret";
		Claims claims;
		try {
			claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token)
					.getBody();
		} catch (Exception e) {
			claims = null;
		}
		System.out.println(claims);
	}
}
