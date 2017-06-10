package priv.fj.webapp.dev.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Timestamp;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import priv.fj.webapp.dev.domain.person.dto.DownloadRecord;
import priv.fj.webapp.dev.domain.person.dto.FormData;
import priv.fj.webapp.dev.domain.person.entity.Person;
import priv.fj.webapp.dev.service.PersonServiceI;

@Controller("personController")
@RequestMapping(value="/person")
public class PersonController {
	@Autowired
	private PersonServiceI personService;
	@RequestMapping(value="/login")
	@ResponseBody
	public Person get(@RequestParam("id") Integer id) {
		return personService.getPersonById(id);
	}
	
	@RequestMapping(value = "/upload")
	public void upload(FormData data) {
		MultipartFile file = data.getFile();
		if (file != null) {
			System.out.println(file.getOriginalFilename());
		}
	}
	
	@RequestMapping(value = "/download")
	public ResponseEntity<byte[]> download() throws FileNotFoundException, IOException {
		byte[] body = FileCopyUtils.copyToByteArray(new FileInputStream(new File("D:\\Users\\Administrator\\Pictures\\7.png")));
		HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "dict.png");
		return new ResponseEntity<byte[]>(body, headers, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/download2")
	public  void download(String fileName, String filePath, HttpServletRequest request, HttpServletResponse response) 
			throws Exception {
			    //声明本次下载状态的记录对象
			    DownloadRecord downloadRecord = new DownloadRecord(fileName, filePath, request);
			    //设置响应头和客户端保存文件名
			    response.setCharacterEncoding("utf-8");
			    response.setContentType("multipart/form-data");
			    response.setHeader("Content-Disposition", "attachment;fileName=" + fileName);
			    //用于记录以完成的下载的数据量，单位是byte
			    long downloadedLength = 0l;
			    try {
			        //打开本地文件流
			        InputStream inputStream = new FileInputStream(filePath);
			        //激活下载操作
			        OutputStream os = response.getOutputStream();

			        //循环写入输出流
			        byte[] b = new byte[2048];
			        int length;
			        while ((length = inputStream.read(b)) > 0) {
			            os.write(b, 0, length);
			            downloadedLength += b.length;
			        }
			        // 这里主要关闭。
			        os.close();
			        inputStream.close();
			    } catch (Exception e){
			        downloadRecord.setStatus(DownloadRecord.STATUS_ERROR);
			        throw e;
			    }
			    downloadRecord.setStatus(DownloadRecord.STATUS_SUCCESS);
			    downloadRecord.setEndTime(new Timestamp(System.currentTimeMillis()));
			    downloadRecord.setLength(downloadedLength);
			    //存储记录
			}
}
