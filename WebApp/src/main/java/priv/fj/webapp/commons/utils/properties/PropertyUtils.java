package priv.fj.webapp.commons.utils.properties;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertyUtils {
	 static {
		 try {
//			InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("configruation/info.properties");
			InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("config.properties");
			Properties properties = new Properties();
			try {
				properties.load(inputStream);
				url = properties.getProperty("jdbc.password");
				root = properties.getProperty("jdbc.username");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		 } catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }
	 
	 public static String url;
	 public static String root;
}
