package priv.fj.webapp.construction.domain.unit.entity;

import java.io.Serializable;
import java.util.List;

import org.apache.ibatis.type.Alias;

import priv.fj.webapp.construction.domain.building.entity.Building;
import priv.fj.webapp.construction.domain.property.entity.Property;
import priv.fj.webapp.dev.domain.device.entity.ExtDev;

/**
 * @author
 *
 */
@Alias("Unit")
public class Unit implements Serializable {
	private static final long serialVersionUID = 3264715484291844407L;
	private Integer unitId;
	private String unitName;
	private Integer propertyLimit;
	private Building building;
	private List<ExtDev> externalGateDevice;
	private List<Property> property;

	public Unit() {
		super();
	}

	public Unit(Integer unitId) {
		super();
		this.unitId = unitId;
	}

	public Unit(Integer unitId, String unitName) {
		super();
		this.unitId = unitId;
		this.unitName = unitName;
	}

	public Building getBuilding() {
		return building;
	}

	public void setBuilding(Building building) {
		this.building = building;
	}

	public List<ExtDev> getExternalGateDevice() {
		return externalGateDevice;
	}

	public void setExternalGateDevice(
			List<ExtDev> externalGateDevice) {
		this.externalGateDevice = externalGateDevice;
	}

	public List<Property> getProperty() {
		return property;
	}

	public void setProperty(List<Property> property) {
		this.property = property;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public Integer getPropertyLimit() {
		return propertyLimit;
	}

	public void setPropertyLimit(Integer propertyLimit) {
		this.propertyLimit = propertyLimit;
	}

}
