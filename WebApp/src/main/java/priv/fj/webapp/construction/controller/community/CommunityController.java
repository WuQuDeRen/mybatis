package priv.fj.webapp.construction.controller.community;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import priv.fj.webapp.commons.domain.dto.AjaxMsg;
import priv.fj.webapp.construction.domain.community.dto.CommunityDto;
import priv.fj.webapp.construction.domain.community.dto.SearchCondition;
import priv.fj.webapp.construction.domain.community.entity.Community;
import priv.fj.webapp.construction.service.CommunityService;

@Controller("communityController")
@RequestMapping(value = "/construction/community")
public class CommunityController {
	private static final Log logger = LogFactory.getLog(CommunityController.class);
	@Autowired
	private CommunityService communityService;

	@RequestMapping(value = "/all", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Community> getList() {
		logger.debug("获取所有的社区信息");
		List<Community> communities = communityService.getList();
		return communities;
	}

	@RequestMapping(value = "/id", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Community getById(@RequestBody SearchCondition condition) {
		logger.debug("根据社区ID查找社区");
		Community community = communityService.getById(condition
				.getCommunityId());
		return community;
	}

	@RequestMapping(value = "/buildingid", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Community getByBuildingId(@RequestBody SearchCondition condition) {
		logger.debug("根据社区ID查找社区");
		Community community = communityService.getByBuildingId(condition
				.getBuildingId());
		return community;
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public AjaxMsg insert(@RequestBody Community community) {
		AjaxMsg msg = communityService.insert(community);
		return msg;
	}
	
	@RequestMapping(value = "/savelist", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public AjaxMsg insertList(@RequestBody CommunityDto communityDto) {
		AjaxMsg msg = communityService.insertList(communityDto);
		return msg;
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Community> getByMultipartCondition(@RequestBody SearchCondition searchCondition) {
		List<Community> communities = communityService.getByMultipartCondition(searchCondition);
		return communities;
	}


}
