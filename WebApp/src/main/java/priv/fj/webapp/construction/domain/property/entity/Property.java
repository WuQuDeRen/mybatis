package priv.fj.webapp.construction.domain.property.entity;

import java.io.Serializable;
import java.util.List;

import org.apache.ibatis.type.Alias;

import priv.fj.webapp.construction.domain.unit.entity.Unit;
import priv.fj.webapp.dev.domain.device.entity.IntDev;

/**
 * @author feiji
 *
 */
@Alias("Property")
public class Property implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer propertyId;
	private String propertyName;
	private String status;
	private String deviceLayout;
	private String layoutVersion;
	private Integer propertyNumber;
	private Unit unit;
	private List<IntDev> internaldoorDevice;

	public Property() {
		super();
	}

	public Property(Integer propertyId) {
		super();
		this.propertyId = propertyId;
	}

	public List<IntDev> getInternaldoorDevice() {
		return internaldoorDevice;
	}

	public void setInternaldoorDevice(
			List<IntDev> internaldoorDevice) {
		this.internaldoorDevice = internaldoorDevice;
	}

	public Integer getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Integer propertyId) {
		this.propertyId = propertyId;
	}

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	public Unit getUnit() {
		return unit;
	}

	public void setUnit(Unit unit) {
		this.unit = unit;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDeviceLayout() {
		return deviceLayout;
	}

	public void setDeviceLayout(String deviceLayout) {
		this.deviceLayout = deviceLayout;
	}

	public String getLayoutVersion() {
		return layoutVersion;
	}

	public void setLayoutVersion(String layoutVersion) {
		this.layoutVersion = layoutVersion;
	}

	public Integer getPropertyNumber() {
		return propertyNumber;
	}

	public void setPropertyNumber(Integer propertyNumber) {
		this.propertyNumber = propertyNumber;
	}

}
