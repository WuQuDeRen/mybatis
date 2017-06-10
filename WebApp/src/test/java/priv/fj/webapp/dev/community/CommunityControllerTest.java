package priv.fj.webapp.dev.community;

import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import priv.fj.webapp.construction.domain.community.dto.SearchCondition;
import priv.fj.webapp.construction.domain.community.entity.Community;
import priv.fj.webapp.dev.common.mock.BaseMockMvc;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class CommunityControllerTest extends BaseMockMvc {
	private String PREFIX = "/construction/community/";
	
	private MockMvc mockMvc;
	
	
	
	@Before
	public void setMockMvc() {
		this.mockMvc = super.getMockMvc();
	}

	@Test
	public void testGetList() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post(PREFIX + "/all"))
			   //.andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
			   .andDo(MockMvcResultHandlers.print());
	}
	
	@Test
	public void testGetById() throws Exception {
		SearchCondition condition = new SearchCondition();
		condition.setCommunityId(1);
		String json = JSON.toJSONString(condition);
		mockMvc.perform(MockMvcRequestBuilders.post(PREFIX + "/id")
						      .contentType(MediaType.APPLICATION_JSON).content(json)
				     ).andDo(MockMvcResultHandlers.print())
				     .andReturn();
	}
	
	@Test
	public void testGetByBuildingId() throws Exception {
		SearchCondition condition = new SearchCondition();
		condition.setBuildingId(1);
		String json = JSON.toJSONString(condition);
		mockMvc.perform(MockMvcRequestBuilders.post(PREFIX + "/buildingid")
						      .contentType(MediaType.APPLICATION_JSON).content(json)
				     ).andDo(MockMvcResultHandlers.print())
				     .andReturn();
	}
	
	@Test
	public void testInsert() throws Exception {
		Community community = new Community();
		community.setProvince("安徽");
		community.setCommunityName("测试小区");
		String json = JSON.toJSONString(community);
		mockMvc.perform(MockMvcRequestBuilders.post(PREFIX + "/save")
			   .contentType(MediaType.APPLICATION_JSON).content(json)
			   )
		       .andDo(MockMvcResultHandlers.print())
		       .andReturn();
	}
	
	@Test
	public void testInsertList() throws Exception {
		JSONObject jsonObj = new JSONObject();
		JSONArray jsonArr = new JSONArray();
		Community community = new Community();
		community.setProvince("安徽1");
		community.setCommunityName("测试小区1");
		
		Community community2 = new Community();
		community2.setProvince("安徽2");
		community2.setCommunityName("测试小区2");
		
		Community community3 = new Community();
		community3.setProvince("安徽3");
		community3.setCommunityName("测试小区3");
		
		jsonArr.add(community);
		jsonArr.add(community2);
		jsonArr.add(community3);
		
		jsonObj.put("communities", jsonArr);
		
		String json = JSONObject.toJSONString(jsonObj);
		
		mockMvc.perform(MockMvcRequestBuilders.post(PREFIX + "/savelist")
			   .contentType(MediaType.APPLICATION_JSON).content(json)
			   )
		       .andDo(MockMvcResultHandlers.print())
		       .andReturn();
	}
	
	@Test
	public void testGetByMultipartCondition() throws Exception {
		SearchCondition condition = new SearchCondition();
		condition.setCommunityId(3);
		String json = JSON.toJSONString(condition);
		mockMvc.perform(MockMvcRequestBuilders.post(PREFIX + "/search")
				.contentType(MediaType.APPLICATION_JSON).content(json)).andDo(MockMvcResultHandlers.print());
	}
}
