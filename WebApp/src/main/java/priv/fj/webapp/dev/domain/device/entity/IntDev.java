package priv.fj.webapp.dev.domain.device.entity;

import java.io.Serializable;
import java.util.Date;

import org.apache.ibatis.type.Alias;

import priv.fj.webapp.construction.domain.property.entity.Property;

@Alias("IntDev")
public class IntDev implements Serializable {
	private static final long serialVersionUID = 1L;
	private String deviceId;
	private String deviceType;
	private String deviceName;
	private String description;
	private Date deviceProduceDate;
	private Date deviceOutFactoryDate;
	private String status;
	private Property property;

	public Property getProperty() {
		return property;
	}

	public void setProperty(Property property) {
		this.property = property;
	}

	public IntDev() {
		super();
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}

	public String getDeviceName() {
		return deviceName;
	}

	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDeviceProduceDate() {
		return deviceProduceDate;
	}

	public void setDeviceProduceDate(Date deviceProduceDate) {
		this.deviceProduceDate = deviceProduceDate;
	}

	public Date getDeviceOutFactoryDate() {
		return deviceOutFactoryDate;
	}

	public void setDeviceOutFactoryDate(Date deviceOutFactoryDate) {
		this.deviceOutFactoryDate = deviceOutFactoryDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
