package priv.fj.webapp.construction.service;

import java.util.List;

import priv.fj.webapp.commons.domain.dto.AjaxMsg;
import priv.fj.webapp.construction.domain.community.dto.CommunityDto;
import priv.fj.webapp.construction.domain.community.dto.SearchCondition;
import priv.fj.webapp.construction.domain.community.entity.Community;

public interface CommunityService {
	List<Community> getList();

	Community getById(Integer id);

	Community getByBuildingId(Integer buildingId);
	
	AjaxMsg insert(Community community);
	
	AjaxMsg insertList(CommunityDto communityDto);
	
	List<Community> getByMultipartCondition(SearchCondition searchCondition);
}
