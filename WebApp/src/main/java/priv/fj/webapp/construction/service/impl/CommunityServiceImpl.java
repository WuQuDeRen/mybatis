package priv.fj.webapp.construction.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;

import priv.fj.webapp.commons.domain.dto.AjaxMsg;
import priv.fj.webapp.construction.dao.CommunityDao;
import priv.fj.webapp.construction.domain.community.dto.CommunityDto;
import priv.fj.webapp.construction.domain.community.dto.SearchCondition;
import priv.fj.webapp.construction.domain.community.entity.Community;
import priv.fj.webapp.construction.service.CommunityService;

@Service("communityServiceImpl")
@Transactional
public class CommunityServiceImpl implements CommunityService{
	@Autowired
	private CommunityDao communityDao;
	
	@Override
	public List<Community> getList() {
		// TODO Auto-generated method stub
		List<Community> communities = communityDao.getList();
		return communities;
	}

	@Override
	public Community getById(Integer id) {
		// TODO Auto-generated method stub
		Community community = communityDao.getById(id);
		return community;
	}

	@Override
	public Community getByBuildingId(Integer buildingId) {
		// TODO Auto-generated method stub
		Community community = communityDao.getByBuildingId(buildingId);
		return community;
	}

	@Override
	public AjaxMsg insert(Community community) {
		// TODO Auto-generated method stub
		int count = communityDao.insert(community);
		if (count != 0) {
			return new AjaxMsg("success", "操作完成");
		}
		return new AjaxMsg("fail", "操作失败");
	}

	@Override
	public AjaxMsg insertList(CommunityDto communityDto) {
		// TODO Auto-generated method stub
		int count = communityDao.insertList(communityDto.getCommunities());
		System.out.println(JSON.toJSONString(communityDto.getCommunities(), true));
		if (count != 0) {
			return new AjaxMsg("success", "操作完成");
		}
		return new AjaxMsg("fail", "操作失败");
	}

	@Override
	public List<Community> getByMultipartCondition(SearchCondition condition) {
		// TODO Auto-generated method stub
		List<Community> communities = communityDao.getByMultipartCondition(condition);
		return communities;
	}
}
