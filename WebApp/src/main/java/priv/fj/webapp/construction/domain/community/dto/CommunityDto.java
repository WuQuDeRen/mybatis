package priv.fj.webapp.construction.domain.community.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import priv.fj.webapp.construction.domain.community.entity.Community;

@Alias("CommunityDto")
public class CommunityDto {

	private List<Community> communities;
	private Integer communityId;

	public List<Community> getCommunities() {
		return communities;
	}

	public void setCommunities(List<Community> communities) {
		this.communities = communities;
	}

	public Integer getCommunityId() {
		return communityId;
	}

	public void setCommunityId(Integer communityId) {
		System.out.println(communityId);
		this.communityId = communityId;
	}

}
