package priv.fj.webapp.construction.domain.building.entity;

import java.io.Serializable;
import java.util.List;

import org.apache.ibatis.type.Alias;

import priv.fj.webapp.construction.domain.community.entity.Community;
import priv.fj.webapp.construction.domain.unit.entity.Unit;

@Alias("Building")
public class Building implements Serializable {
	private static final long serialVersionUID = 2322784844308135599L;
	private Integer buildingId;
	private String buildingName;
	private Integer unitLimit;
	private Community community;
	private List<Unit> units;

	public Building() {
		super();
	}

	public Building(Integer buildingId) {
		super();
		this.buildingId = buildingId;
	}

	public Integer getBuildingId() {
		return buildingId;
	}

	public void setBuildingId(Integer buildingId) {
		this.buildingId = buildingId;
	}

	public String getBuildingName() {
		return buildingName;
	}

	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}

	public Integer getUnitLimit() {
		return unitLimit;
	}

	public void setUnitLimit(Integer unitLimit) {
		this.unitLimit = unitLimit;
	}

	public Community getCommunity() {
		return community;
	}

	public void setCommunity(Community community) {
		this.community = community;
	}

	public List<Unit> getUnits() {
		return units;
	}

	public void setUnits(List<Unit> units) {
		this.units = units;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
