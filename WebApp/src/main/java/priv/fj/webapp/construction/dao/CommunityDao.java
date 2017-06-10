package priv.fj.webapp.construction.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import priv.fj.webapp.construction.domain.community.dto.SearchCondition;
import priv.fj.webapp.construction.domain.community.entity.Community;

@Repository
public interface CommunityDao {
	
	public List<Community> getList();
	
	public Community getById(@Param("communityId") Integer communityId);
	
	public Community getByBuildingId(@Param("buildingId") Integer buildingId);
	
	public int insert(Community community);
	
//	public int insertList(CommunityDto communityDto);
	public int insertList(List<Community> communityDto);
	
	public List<Community> getByMultipartCondition(SearchCondition condition);
	
}
