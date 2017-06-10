package priv.fj.webapp.dev.domain.device.entity;

import java.io.Serializable;
import java.util.Date;

import org.apache.ibatis.type.Alias;

import priv.fj.webapp.construction.domain.unit.entity.Unit;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

@Alias("ExtDev")
public class ExtDev implements Serializable {
	private static final long serialVersionUID = 1L;
	private String deviceId;
	private String deviceType;
	private String deviceName;
	private String description;
	private Date deviceProduceDate;
	private Date deviceOutFactoryDate;
	private String status;
	private Unit unit;

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

	public Unit getUnit() {
		return unit;
	}

	public void setUnit(Unit unit) {
		this.unit = unit;
	}

	@Override
	public String toString() {
		return JSON.toJSONString(this, SerializerFeature.PrettyFormat);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((deviceId == null) ? 0 : deviceId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ExtDev other = (ExtDev) obj;
		if (deviceId == null) {
			if (other.deviceId != null)
				return false;
		} else if (!deviceId.equals(other.deviceId))
			return false;
		return true;
	}

}
