package priv.fj.webapp.dev.dao;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.StringReader;
import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;

import priv.fj.webapp.dev.BaseTest;
import priv.fj.webapp.dev.domain.device.entity.ExtDev;
import priv.fj.webapp.dev.domain.person.dto.SearchDev;

import com.github.pagehelper.PageHelper;

public class ExtDevTest extends BaseTest{
	@Autowired
	private ExtDevDao extDevDao;
	
	@Test
	public void testInsert() {
		ExtDev dev = new ExtDev();
		dev.setDeviceId("aaaaaaa1231232");
		dev.setDescription("111");
		dev.setDeviceType("external");
		dev.setDeviceName("abc0000009");
		dev.setDeviceProduceDate(new Date());
		dev.setDeviceProduceDate(new Date());
		dev.setStatus("offline");
		int count = extDevDao.insert(dev);
		Assert.assertEquals(count, 1);
	}
	@Test
	public void testGet() {
		PageHelper.startPage(1, 2);
		SearchDev search = new SearchDev();
		search.setDevId("1479440934753unit1");
		search.setFetch("eager");
		ExtDev extDev = extDevDao.get(search);
		System.out.println(extDev);
	}
	
	@Test
	public void testGetList() throws IOException {
		SearchDev search = new SearchDev();
		search.setCompanyId(1);
		handleResult(search);
	}
	
	@Test
	public void testList() throws IOException {
		SearchDev search = new SearchDev();
		search.setCompanyId(1);
		search.setBuildingId(11);
		search.setCommunityId(80);
		handleResult(search);
	}
	
	private void handleResult(SearchDev search)
			throws FileNotFoundException, IOException {
		if (search.getBuildingId() != null || search.getCommunityId() != null || search.getUnitId() != null) {
			search.setCompanyId(null);
		}
		List<ExtDev> extDev = extDevDao.getList(search);
		ByteArrayInputStream in = new ByteArrayInputStream(extDev.toString().getBytes());
		FileOutputStream out = new FileOutputStream(new File("D:\\atest\\a.txt"));
		FileCopyUtils.copy(in, out);
	}
}
